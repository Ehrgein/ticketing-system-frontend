import React from "react";
import Sidebar from "../../components/ui/Sidebar";
import AddEvent from "../../components/ui/AddEvent";
import { useGetUserData } from "@/app/helpers/useGetUserData";
import { redirect } from "next/navigation";
import UserInfo from "@/app/components/ui/UserInfo";
import { ProfileForm } from "@/app/components/forms/AddEventForm";

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
          <div className="w-full bg-gray-100 pb-20 py-20 flex justify-center">
            <div className="w-[900px] bg-white p-8 rounded-md">
              <ProfileForm />
            </div>
          </div>
          {/* <AddEvent /> */}
        </div>
      </div>
    </>
  );
}

export default EventCreatePage;
