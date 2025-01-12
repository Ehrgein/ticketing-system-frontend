import React from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon, Bell } from "lucide-react";
import Image from "next/image";
import me from "../../../../public/hehe123.jpg";

function UserInfo() {
  return (
    <div
      className="flex justify-between w-full bg-white 
      py-6 px-8"
    >
      <div className="flex items-center w-full max-w-sm space-x-2 rounded-lg border border-gray-300 bg-gray-50 dark:bg-gray-900 px-3.5 py-2">
        <SearchIcon className="h-4 w-4" />
        <Input
          type="search"
          placeholder="Search"
          className="w-full border-0 h-8 font-normal outline-none"
        />
      </div>
      <div className="flex items-center gap-6">
        <Bell size={20} />
        <div className="h-12 w-12">
          <Image
            src={me}
            className="object-cover rounded-full w-full h-full"
            alt="hello"
          />
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
