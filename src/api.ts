import { readFileSync, writeFileSync } from "node:fs";
import { revalidatePath } from "next/cache";
import createManifest from "./app/helpers/createManifest";
import { MercadoPagoConfig, Preference } from "mercadopago";
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

    async add({ id, xSignature, xRequestId }: VerifiedMessage): Promise<void> {
      // Obtenemos los mensajes
      // const db = await api.message.list();

      const payment = await new Payment(mercadopago).get({ id: id });

      console.log(payment, "this is the payment object. If the ");

      // Si se aprueba, agregamos el mensaje
      if (payment.status === "approved") {
        // Obtenemos los datos

        const validated = createManifest(id, xSignature, xRequestId);

        console.log(validated);

        // await api.message.add({ id: payment.id!, text: payment.metadata.text });

        // Revalidamos la página de inicio para mostrar los datos actualizados
        revalidatePath("/");
      }

      // Si ya existe un mensaje con ese id, lanzamos un error
      // if (db.some((_message) => _message.id === message.id)) {
      //   throw new Error("Message already added");
      // }

      // Agregamos el nuevo mensaje
      // const draft = db.concat(message);

      // Guardamos los datos
      // writeFileSync("db/message.db", JSON.stringify(draft, null, 2));
    },

    async submit(text: Message["text"]) {
      // Creamos la preferencia incluyendo el precio, titulo y metadata. La información de `items` es standard de Mercado Pago. La información que nosotros necesitamos para nuestra DB debería vivir en `metadata`.
      const preference = await new Preference(mercadopago).create({
        body: {
          items: [
            {
              id: "message",
              unit_price: 50,
              quantity: 1,
              title: "Mensaje de muro",
            },
          ],
          metadata: {
            text,
          },
        },
      });

      // Devolvemos el init point (url de pago) para que el usuario pueda pagar
      return preference.init_point!;
    },
    async submitMercadopago({
      price,
      quantity,
    }: {
      price: number;
      quantity: number;
    }) {
      // Creamos la preferencia incluyendo el precio, titulo y metadata. La información de `items` es standard de Mercado Pago. La información que nosotros necesitamos para nuestra DB debería vivir en `metadata`.

      console.log("this is the quantity:", quantity);
      console.log("this is the price", price);

      const preference = await new Preference(mercadopago).create({
        body: {
          items: [
            {
              id: "message",
              unit_price: price,
              quantity: quantity,
              title: "Mensaje de muro",
            },
          ],
          metadata: {
            price,
            quantity,
          },
        },
      });

      // Devolvemos el init point (url de pago) para que el usuario pueda pagar
      return preference.init_point!;
    },
  },
};

export default api;
