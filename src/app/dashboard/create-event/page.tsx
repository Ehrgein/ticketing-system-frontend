import React from "react";
import Sidebar from "../../components/ui/Sidebar";
import AddEvent from "../../components/ui/AddEvent";
import { useGetUserData } from "@/app/helpers/useGetUserData";
import { redirect } from "next/navigation";
import UserInfo from "@/app/components/ui/UserInfo";

async function EventCreatePage() {
  const { data, error } = await useGetUserData();

  if (!data.user?.aud) {
    redirect("/login");
  }

  return (
    <>
      <div className="flex bg-black w-full">
        <Sidebar />
        <div className="w-full">
          <UserInfo />
          <AddEvent />
        </div>
      </div>
    </>
  );
}

export default EventCreatePage;
