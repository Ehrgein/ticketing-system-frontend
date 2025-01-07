import { redirect } from "next/navigation";
import { mercadopago } from "@/api";
import { Preference } from "mercadopago";

// Queremos que esta página sea estática, nos encargaremos de revalidar los datos cuando agreguemos un nuevo mensaje
export const dynamic = "force-static";

export default async function HomePage() {
  async function add(formData: FormData) {
    "use server";

    const message = formData.get("text") as string;

    const preference = await new Preference(mercadopago).create({
      body: {
        items: [
          {
            id: "message",
            unit_price: 200,
            quantity: 1,
            title: "Entrada Metallicaaa",
          },
        ],
        metadata: {
          message,
        },
      },
    });

    // Redirect the user to the payment URL
    redirect(preference.init_point!);
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
