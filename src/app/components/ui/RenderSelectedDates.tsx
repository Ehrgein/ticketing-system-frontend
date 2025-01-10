import React from "react";

function RenderSelectedDates({ dateTimes }: { dateTimes: string[] }) {
  return (
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
  );
}

export default RenderSelectedDates;
