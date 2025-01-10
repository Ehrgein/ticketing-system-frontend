"use client";
import React from "react";

function EventLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-white text-lg pt-6">{children}</label>;
}

function EventCreatePage() {
  const [dateTimes, setDateTimes] = React.useState<string[]>([]);
  const [currentDateTime, setcurrentDateTime] = React.useState<string>("");
  const [availableSeats, setAvailableSeats] = React.useState<string[]>([]);
  const [currentSeat, setCurrentSeat] = React.useState<string>("");

  const handleAddSeats = (value: string) => {
    setCurrentSeat(currentSeat);
  };

  const handleChange = (value: string) => {
    setcurrentDateTime(value);
  };

  const addDateTimes = (e) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="pt-40 pb-40">
      <h3 className="text-2xl">Create your event here.</h3>

      <form className="text-black pt-10 flex flex-col gap-2">
        <EventLabel>Event name:</EventLabel>
        <input
          type="string"
          name="event_name"
          className="p-2 rounded-sm"
          defaultValue={"Taylor Swift Eras"}
        />
        <EventLabel>Description:</EventLabel>
        <input
          type="string"
          name="event_description"
          className="p-2 rounded-sm"
          defaultValue={"Taylor's World Tour!"}
        />
        <EventLabel>Price:</EventLabel>
        <input
          type="number"
          name="ticket_price"
          className="p-2 rounded-sm"
          defaultValue={100}
        />
        <EventLabel>Available Tickets</EventLabel>
        <input
          type="number"
          name="ticket_price"
          className="p-2 rounded-sm"
          defaultValue={300}
        />
        <EventLabel>Location:</EventLabel>
        <input
          type="string"
          name="event_location"
          className="p-2 rounded-sm"
          defaultValue={"Helsinki Arena"}
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
        <div className="grid grid-cols-2 gap-4 pt-4">
          {dateTimes.map((datetime) => {
            const formattedDate = new Date(datetime).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <p
                key={formattedDate}
                className="py-2 px-4 rounded-sm bg-white text-black opacity-0 animate-fade-in "
              >
                {formattedDate}
              </p>
            );
          })}
        </div>
      </form>
    </div>
  );
}

export default EventCreatePage;
