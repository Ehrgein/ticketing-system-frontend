import { readFileSync, writeFileSync } from "node:fs";
import { revalidatePath } from "next/cache";
import createManifest from "./app/helpers/createManifest";
import { MercadoPagoConfig, Preference, PaymentRefund } from "mercadopago";
import { Payment } from "mercadopago";

interface Message {
  id: number;
  text: string;
}

interface VerifiedMessage {
  id: string;
  xSignature: string | null;
  xRequestId: string | null;
}

export const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

const api = {
  message: {
    async list(): Promise<Message[]> {
      // Leemos el archivo de la base de datos de los mensajes
      const db = readFileSync("db/message.db");

      // Devolvemos los datos como un array de objetos
      return JSON.parse(db.toString());
    },

    async createPaymentRequest({
      event_time_id,
      event_id,
      purchaser_id,
      price_per_ticket,
      seat_location,
      quantity,
    }: {
      event_time_id: number;
      event_id: number;
      purchaser_id: number;
      price_per_ticket: number;
      seat_location: string;
      quantity: number;
    }) {
      // Creamos la preferencia incluyendo el precio, titulo y metadata. La información de `items` es standard de Mercado Pago. La información que nosotros necesitamos para nuestra DB debería vivir en `metadata`.

      const preference = await new Preference(mercadopago).create({
        body: {
          items: [
            {
              id: "message",
              unit_price: 100,
              quantity: quantity,
              title: "Entrada Metallica",
            },
          ],
          metadata: {
            event_time_id,
            event_id,
            purchaser_id,
            price_per_ticket,
            seat_location,
            quantity,
          },
        },
      });

      // Devolvemos el init point (url de pago) para que el usuario pueda pagar
      return preference.init_point!;
    },

    async sendPaymentData({
      id,
      xSignature,
      xRequestId,
    }: VerifiedMessage): Promise<void> {
      const payment = await new Payment(mercadopago).get({ id: id });

      // If approved, we need to validate it with the createManifest helper.
      if (payment.status === "approved") {
        console.log(payment, "payment object");
        // if validated, we can upload anything we want to our database.
        const validated = createManifest(id, xSignature, xRequestId);

        if (validated) {
          console.log("it has been validated");
          const response = await fetch("http://localhost:4000/api/tickets", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              event_time_id: payment.metadata.event_time_id,
              event_id: payment.metadata.event_id,
              ticket_id: payment.metadata.ticket_id,
              location: "River Plate",
              quantity: payment.metadata.quantity,
              price_per_ticket: payment.metadata.price_per_ticket,
              seat_location: payment.metadata.seat_location,
              purchaser_id: payment.metadata.purchaser_id,
              payer_email: payment.payer?.email,
              payer_firstName: "Juan",
              payer_lastName: "Perez",
              payer_id: payment.payer?.id,
              identification_num: payment.payer?.identification?.number,
              identification_type: payment.payer?.identification?.type,
            }),
          });
        }

        revalidatePath("/");
      }
    },

    async refundTicket() {
      const paymentRefund = new PaymentRefund(mercadopago);

      paymentRefund.create({
        payment_id: "12345678901",
        body: {
          amount: 5,
        },
      });
    },
  },
};

export default api;
