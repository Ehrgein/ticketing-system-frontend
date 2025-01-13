import React from "react";
import concertone from "../../../public/concertone.jpg";
import { formatDateTime } from "../utils/date/date";
import Image from "next/image";
import concertwo from "../../../public/concertwo.jpg";
import concerthree from "../../../public/concertthree.jpg";

type EventInfo = {
  event_name: string;
  description: string;
  location: string;
  event_info: { datetime: string }[];
};

async function EventsList() {
  const response = await fetch("http://localhost:4000/api/events");

  const data: EventInfo[] = await response.json();

  console.log(data, "data");

  return (
    <>
      <div className="w-full h-[600px]">
        <Image
          className="w-full h-full object-cover"
          alt="hi"
          src={concerthree}
        />
      </div>
      <div className="pt-24 pb-40 w-screen flex justify-center flex-col items-center">
        <div className="text-black">
          <p>These are my events!</p>
        </div>
        <div className="w-full max-w-[1400px] grid grid-cols-2 items-center justify-center gap-6 pt-12 text-black">
          {data.map(
            ({ event_name, description, location, event_info }, index) => {
              const formattedDate = formatDateTime(
                data[index].event_info[0].datetime
              );

              return (
                <div
                  key={event_name}
                  className="flex flex-col justify-center items-center"
                >
                  <div className="w-[600px] h-[300px]">
                    <Image
                      className="w-full h-full rounded-md"
                      src={concertwo}
                      alt="hi"
                    />
                  </div>
                  <div className="space-y-2 w-[600px] text-black pt-6">
                    <h4 className="text-lg opacity-70">{formattedDate}</h4>
                    <h3 className="text-2xl">{event_name}</h3>
                    <p className="opacity-70 text-lg">{location}</p>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </>
  );
}

export default EventsList;
