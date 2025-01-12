import React from "react";
import Link from "next/link";
import { signOut } from "@/app/login/actions";

function Sidebar() {
  return (
    <div className="h-screen bg-[#DFD9D9] w-1/5">
      <div className="p-6 pt-10">
        <h1 className="text-black opacity-95 text-4xl font-medium">
          NANI EVENTOS
        </h1>
      </div>
      <div className="p-6 pt-10 w-full">
        <ul className="flex flex-col gap-4 font-medium text-xl uppercase text-black pl-6 opacity-95">
          <Link href={"/"}>Home</Link>
          <Link href={"/create-event"}>Crear Evento</Link>
          <button onClick={signOut}>Sign out</button>
          <Link href={"/"}></Link>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
