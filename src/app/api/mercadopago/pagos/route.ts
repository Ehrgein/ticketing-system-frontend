import api, { mercadopago } from "@/api";

export async function POST(request: Request) {
  // Obtenemos el cuerpo de la petición que incluye información sobre la notificación

  const xSignature = request.headers.get("x-signature");
  const xRequestId = request.headers.get("x-request-id");

  const body: { data: { id: string } } = await request.json();

  await api.message.add({
    id: body.data.id,
    xSignature,
    xRequestId,
  });

  console.log("el pago se realizo, potencialmente");
  // Respondemos con un estado 200 para indicarle que la notificación fue recibida
  return new Response(null, { status: 200 });
}
