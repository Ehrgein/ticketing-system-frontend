import { redirect } from "next/navigation";
import React from "react";
import api from "@/api";

function TicketsNewPage() {
  //   async function add(formData: FormData) {
  //     "use server";

  //     const message = formData.get("text") as string;
  //     const url = await api.message.submit(message);

  //     redirect(url);
  //   }

  async function buyTicketaction(formData: FormData) {
    "use server";

    const price = Number(formData.get("price"));
    const quantity = Number(formData.get("quantity"));

    const data = { price, quantity };

    const url_mercadopago = await api.message.submitMercadopago(data);

    redirect(url_mercadopago);
  }

  return (
    <div className="">
      <h1 className="pb-4">Metallica</h1>

      <form action={buyTicketaction} className="grid gap-2">
        <label>450</label>
        <input type="hidden" name="price" value={450} />
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
  );
}

export default TicketsNewPage;
