import api from "@/api";
import { redirect } from "next/navigation";

export async function buyTicketAction(formData: FormData) {
  "use server";

  const user = "Juan Perez";
  const purchaser_id = 14;

  const event_id = 1;

  const seat_location = "A3";
  const price_per_ticket = Number(formData.get("price"));
  const quantity = Number(formData.get("quantity"));
  const event_time_id = Number(formData.get("locationID"));

  const data = {
    event_id,
    event_time_id,
    purchaser_id,
    seat_location,
    price_per_ticket,
    quantity,
  };

  // Step 1: This line is the starter of the process. Creates a payment order for whatever the user has selected in the form. It returns a redirect to the URL Api where you make the purchase.
  const url_mercadopago = await api.message.createPaymentRequest(data);

  redirect(url_mercadopago);
}

export async function handleRefund() {
  "use server";
  const refund = await api.message.refundTicket();

  console.log(refund);
}
