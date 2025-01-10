"use client";
import React from "react";
import RenderSelectedDates from "../components/ui/RenderSelectedDates";

type EventInfo = {
  event_name: String;
  description: String;
  ticket_price: Number;
  ticket_availability: Number;
  location: String;
  datetime: Date[];
};

function EventLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-white text-lg pt-6">{children}</label>;
}

function EventCreatePage() {
  const [dateTimes, setDateTimes] = React.useState<string[]>([]);
  const [currentDateTime, setcurrentDateTime] = React.useState<string>("");

  const [eventName, setEventName] = React.useState<string>("Taylor Swift Eras");
  const [description, setDescription] = React.useState<string>(
    "Taylor's World Tour!"
  );
  const [price, setPrice] = React.useState<number>(100);
  const [availableSeats, setAvailableSeats] = React.useState<number>(300);
  const [location, setLocation] = React.useState<string>("Helsinki Arena");

  const handleChange = (value: string) => {
    setcurrentDateTime(value);
  };

  const addDateTimes = (e: any) => {
    e.preventDefault();
    console.log("hello!");
    if (currentDateTime) {
      const formattedTime = new Date(currentDateTime).toISOString();

      setDateTimes([...dateTimes, formattedTime]);
      setcurrentDateTime("");
    }
    console.log(dateTimes);
  };

  React.useEffect(() => {
    console.log(dateTimes);
  }, [dateTimes]);

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

    console.log(formData);

    const response = await fetch("http://localhost:4000/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    console.log(data);
  };

  return (
    <div className="pt-40 pb-40">
      <h3 className="text-2xl">Create your event here.</h3>

      <form className="text-black pt-10 flex flex-col gap-2">
        <EventLabel>Event name:</EventLabel>
        <input
          type="string"
          name="event_name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="p-2 rounded-sm"
        />
        <EventLabel>Description:</EventLabel>
        <input
          type="string"
          name="event_description"
          className="p-2 rounded-sm"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <EventLabel>Price:</EventLabel>
        <input
          type="number"
          name="ticket_price"
          className="p-2 rounded-sm"
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
  );
}

export default EventCreatePage;
