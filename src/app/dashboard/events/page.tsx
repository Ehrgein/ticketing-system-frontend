import React from "react";
import { useGetUserData } from "@/app/helpers/useGetUserData";
import Link from "next/link";
import Sidebar from "@/app/components/ui/Sidebar";
import { redirect } from "next/navigation";
import AddEvent from "@/app/components/ui/AddEvent";

async function CreateEvent() {
  const { data, error } = await useGetUserData();

  if (!data.user?.aud) {
    redirect("/login");
  }

  return (
    <>
      <Sidebar />
    </>
  );
}

export default CreateEvent;
