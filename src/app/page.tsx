import { redirect } from "next/navigation";

import api from "@/api";

// Queremos que esta página sea estática, nos encargaremos de revalidar los datos cuando agreguemos un nuevo mensaje
export const dynamic = "force-static";

export default async function HomePage() {
  async function add(formData: FormData) {
    "use server";

    const message = formData.get("text") as string;

    // This line creates a new "preference" (a request to make a payment for a ticket) in the MercadoPago API
    // const url = await api.message.createPaymentRequest(message);

    // redirect(url);
  }

  return (
    <section className="grid gap-8">
      <form action={add} className="grid gap-2">
        <textarea
          className="border-2 border-blue-400 p-2"
          name="text"
          placeholder="Hola perro"
          rows={3}
        />
        <button className="rounded bg-blue-400 p-2" type="submit">
          Enviar
        </button>
      </form>
    </section>
  );
}
