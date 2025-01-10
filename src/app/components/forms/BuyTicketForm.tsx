import React from "react";
import { buyTicketAction, handleRefund } from "@/app/actions/actions";

function BuyTicketForm({ availableSeats }: { availableSeats: string[] }) {
  const event = [
    {
      price: 100,
    },
  ];

  return (
    <form action={buyTicketAction} className="grid gap- space-y-4">
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
  );
}

export default BuyTicketForm;
