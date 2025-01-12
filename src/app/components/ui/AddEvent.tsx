"use client";
import React from "react";
import RenderSelectedDates from "./RenderSelectedDates";
import { Input } from "@/components/ui/input";
import { InputWithFocus } from "@/components/ui/inputWithFocus";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

// type EventInfo = {
//   event_name: String;
//   description: String;
//   ticket_price: Number;
//   ticket_availability: Number;
//   location: String;
//   datetime: Date[];
// };

function EventLabel({
  children,
  labelColor = "text-black",
}: {
  children: React.ReactNode;
  labelColor?: string;
}) {
  return <label className={`${labelColor} text-lg pt-6`}>{children}</label>;
}

function AddEvent() {
  const [dateTimes, setDateTimes] = React.useState<string[]>([]);
  const [currentDateTime, setcurrentDateTime] = React.useState<string>("");

  const [eventName, setEventName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [price, setPrice] = React.useState<number>(1);
  const [availableSeats, setAvailableSeats] = React.useState<number>(1);
  const [location, setLocation] = React.useState<string>("");

  const EventInfo = z.object({
    event_name: z
      .string()
      .min(3, { message: "Event must be longer then 3 caracters" }),
    description: z.string(),
    ticket_price: z.number(),
    ticket_availability: z.number(),
    location: z.string(),
    datetime: z.string().datetime(),
  });

  const handleChange = (value: string) => {
    setcurrentDateTime(value);
  };

  const addDateTimes = (e: any) => {
    e.preventDefault();

    if (currentDateTime) {
      const formattedTime = new Date(currentDateTime).toISOString();

      setDateTimes([...dateTimes, formattedTime]);
      setcurrentDateTime("");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = {
      event_name: eventName,
      description: description,
      price_per_ticket: price,

      ticket_availability: availableSeats,
      location: location,
      datetime: dateTimes,
    };

    const response = await fetch("http://localhost:4000/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
  };

  return (
    <div className="w-full bg-gray-100 opacity-95">
      <div className="pt-20 pb-20  flex-grow items-center justify-center flex flex-col">
        <h3 className="text-2xl">Create your event here.</h3>
        <div className=" bg-white p-6 pt-4">
          <form className="text-black pt-10 w-[600px] flex flex-col gap-2">
            <EventLabel>Event name:</EventLabel>
            {/* <input type="string" name="event_name" className="p-2 rounded-sm" /> */}
            <InputWithFocus
              type="string"
              placeholder="Taylor Swift Eras"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <EventLabel>Description:</EventLabel>
            <InputWithFocus
              type="string"
              placeholder="Taylor's greatest tour, don't miss it!"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <EventLabel>Price:</EventLabel>
            <InputWithFocus
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />

            <EventLabel>Available Tickets</EventLabel>
            <input
              type="number"
              name="ticket_seats"
              className="p-2 rounded-sm"
              onChange={(e) => setAvailableSeats(Number(e.target.value))}
              value={availableSeats}
            />
            <EventLabel>Location:</EventLabel>
            <input
              type="string"
              name="event_location"
              className="p-2 rounded-sm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <EventLabel>Date Times</EventLabel>
            <input
              type="datetime-local"
              min={new Date().toISOString().slice(0, 16)}
              name="event_datetime"
              onChange={(e) => handleChange(e.target.value)}
              value={currentDateTime}
              className="p-2 rounded-sm"
            />
            <button
              onClick={(e) => addDateTimes(e)}
              className=" py-2 bg-white text-black rounded-sm px-4 mt-4"
            >
              Add Datetime!
            </button>
            <RenderSelectedDates dateTimes={dateTimes} />
            <button
              type="submit"
              onClick={handleSubmit}
              className="text-black bg-white px-4 py-2 rounded-sm "
            >
              Submit!@
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEvent;
