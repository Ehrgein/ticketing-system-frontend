import { redirect } from "next/navigation";
import React, { use } from "react";
import api from "@/api";
import { createClient } from "../utils/supabase/server";
import { useGetUserData } from "../helpers/useGetUserData";
import BuyTicketForm from "../components/forms/BuyTicketForm";
import RefundTicket from "../components/forms/RefundTicket";

async function TicketsNewPage() {
  const availableSeats = ["A1", "A2", "A3", "A4", "A5"];

  const { data } = await useGetUserData();

  return (
    <div>
      {data.user?.aud ? (
        <div className="pt-40">
          <h1 className="pb-4 font-medium text-lg">
            Metallica - River Plate 25/02
          </h1>
          <p></p>
          {/* <RefundTicket /> */}

          <BuyTicketForm availableSeats={availableSeats} />
        </div>
      ) : (
        <p>You need to be logged in to buy tickets. </p>
      )}
    </div>
  );
}

export default TicketsNewPage;
