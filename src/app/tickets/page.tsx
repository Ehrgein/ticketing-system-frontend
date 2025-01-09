import { redirect } from "next/navigation";
import React, { use } from "react";
import api from "@/api";
import { createClient } from "../utils/supabase/server";
import { useGetUserData } from "../helpers/useGetUserData";

async function TicketsNewPage() {
  const availableSeats = ["A1", "A2", "A3", "A4", "A5"];

  const { data } = await useGetUserData();

  async function buyTicketaction(formData: FormData) {
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

  async function handleRefund() {
    "use server";
    const refund = await api.message.refundTicket();

    console.log(refund);
  }

  return (
    <div>
      {data.user?.aud ? (
        <div className="">
          <h1 className="pb-4 font-medium text-lg">
            Metallica - River Plate 25/02
          </h1>
          <p></p>
          <form action={handleRefund}>
            <button type="submit" className="py-2 px-6 bg-green-700">
              REFUND ME NOW
            </button>
          </form>

          <form action={buyTicketaction} className="grid gap- space-y-4">
            <label>Precio: $100</label>
            <input type="hidden" name="price" value={250} />
            <label>Ubicacion</label>
            <select
              name="locationID"
              defaultValue={14}
              className="text-black p-2 rounded-none"
            >
              <option value={14}>01/05/2025 - 14:00hs - Campo</option>
              <option value={15}>01/05/2026 - 17:00hs - Campo</option>
              <option value={16}>01/05/2027 - 23:00hs - Campo</option>
            </select>

            <label>Available Seats:</label>
            <select className="text-black p-2" name="seat_location">
              {availableSeats.map((seat) => (
                <option key={seat} value={seat}>
                  {seat}
                </option>
              ))}
            </select>

            <label className="">Quantity</label>
            <input
              className="border-2 border-blue-400 p-2 text-black"
              type="number"
              name="quantity"
              defaultValue={1}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:text-black hover:bg-white transition-all duration-500 ease-in-out"
            >
              Buy Ticket
            </button>
          </form>
        </div>
      ) : (
        <p>You need to be logged in to buy tickets. </p>
      )}
    </div>
  );
}

export default TicketsNewPage;
