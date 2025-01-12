import React from "react";
import Link from "next/link";
import { signOut } from "@/app/login/actions";
import {
  House,
  Calendar1,
  ChartNoAxesCombined,
  Ticket,
  Banknote,
  Logs,
} from "lucide-react";

function Sidebar() {
  return (
    <div className="h-screen bg-[#232E42] w-1/6 text-[#EBE5E5]">
      <div className="pb-6 pt-10 pl-9">
        <h1 className="opacity-95 text-2xl font-medium">NANI EVENTOS</h1>
      </div>
      <div className="bg-[#151515] h-[1px] opacity-30 mt-3 w-[80%] mx-auto"></div>
      <div className="p-6 pt-14 w-full">
        <ul className="flex flex-col gap-4 font-medium text-lg pl-6 opacity-95">
          <li className="flex gap-5 items-center">
            <House size={18} />
            <Link href={"/"}>Home</Link>
          </li>
          <li className="flex gap-5 items-center">
            <Calendar1 size={18} color="#2CEDB0" />
            <Link href={"/"} className="text-[#2CEDB0]">
              Events
            </Link>
          </li>
          <li className="flex gap-5 items-center">
            <ChartNoAxesCombined size={18} />
            <Link href={"/"}>Analytics</Link>
          </li>
          <li className="flex gap-5 items-center">
            <Ticket size={18} />
            <Link href={"/"}>Tickets</Link>
          </li>
          <li className="flex gap-5 items-center">
            <Banknote size={18} />
            <Link href={"/"}>Sales</Link>
          </li>
          <li className="flex gap-5 items-center">
            <Logs size={18} />
            <Link href={"/"}>Logs</Link>
          </li>
        </ul>
      </div>
      <div className="h-full">
        <button className="my-auto" onClick={signOut}>
          Sign out
        </button>
      </div>
      <Link href={"/"}></Link>
    </div>
  );
}

export default Sidebar;
