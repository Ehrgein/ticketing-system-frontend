import React from "react";
import { handleRefund } from "@/app/actions/actions";

function RefundTicket() {
  return (
    <form action={handleRefund}>
      <button type="submit" className="py-2 px-6 bg-green-700">
        REFUND ME NOW
      </button>
    </form>
  );
}

export default RefundTicket;
