import api, { mercadopago } from "@/api";

export async function POST(request: Request) {
  // Once a payment has been made, the webhook we exposed in the mercadopago configuration with the open port will trigger this route.

  const xSignature = request.headers.get("x-signature");
  const xRequestId = request.headers.get("x-request-id");

  const body: { data: { id: string } } = await request.json();

  // With the data we receive from the webhook, we can send the id of the payment, the xSignature and the xRequestId to the MercadoPago API to verify that the payment was made correctly.
  await api.message.sendPaymentData({
    id: body.data.id,
    xSignature,
    xRequestId,
  });

  console.log("el pago se realizo, potencialmente");
  // We return a 200 to let Mercadopago know that we received the notification.
  return new Response(null, { status: 200 });
}
