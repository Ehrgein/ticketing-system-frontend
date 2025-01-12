"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputWithFocus } from "@/components/ui/inputWithFocus";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const EventInfo = z.object({
  event_name: z
    .string()
    .min(3, { message: "Event must be longer then 3 caracters" }),
  description: z.string(),
  ticket_price: z.coerce.number(),
  ticket_availability: z.coerce.number(),
  location: z.string(),
  datetime: z.date(),
  time: z.string(),
});

export function ProfileForm() {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = React.useState<string>("12:00");

  const [dateTimes, setDateTimes] = React.useState<string[]>([]);

  const form = useForm<z.infer<typeof EventInfo>>({
    resolver: zodResolver(EventInfo),
    defaultValues: {
      event_name: "",
      description: "",
      ticket_price: 1,
      ticket_availability: 1,
      location: "",
      datetime: new Date(),
      time: "00:00",
    },
  });

  const handleAddDateTime = () => {
    if (!selectedDate || !selectedTime) return;

    console.log("Selected Time:", selectedTime); // e.g., 19:00

    // Strip the time part from the date (optional, already defaulted to midnight)
    const dateOnly = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );

    // Extract hours and minutes from the time input
    const [hours, minutes] = selectedTime.split(":").map(Number);

    // Combine date and time into a single Date object
    const combinedDateTime = new Date(dateOnly);
    combinedDateTime.setHours(hours, minutes);

    const formattedTime = new Date(combinedDateTime).toISOString();

    setDateTimes([...dateTimes, formattedTime]);

    // Add to the list of DateTimes
    // setDateTimeList((prev) => [...prev, combinedDateTime]);

    // Reset fields
    setSelectedDate(null);
    setSelectedTime("12:00");
  };

  async function onSubmit(values: z.infer<typeof EventInfo>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const {
      event_name,
      description,
      location,
      ticket_availability,
      ticket_price,
    } = values;

    const formData = {
      event_name,
      description,
      location,
      ticket_availability,
      price_per_ticket: ticket_price,
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
    console.log(data);
  }

  React.useEffect(() => {
    // console.log(selectedDate);
    // console.log(selectedTime, "selected time");
    console.log(dateTimes);
  }, [selectedDate, selectedTime, dateTimes]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="event_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <InputWithFocus
                  placeholder="Taylor Swift - Eras Tour"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <InputWithFocus
                  placeholder="Taylor's Swift's greatest tour!"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ticket_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ticket Price</FormLabel>
              <FormControl>
                <InputWithFocus
                  type="number"
                  min={0}
                  placeholder="shadcn"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ticket_availability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tickets Available</FormLabel>
              <FormControl>
                <InputWithFocus
                  type="number"
                  min={0}
                  placeholder="100"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <InputWithFocus
                  type="string"
                  placeholder="Oslo Arena"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-6 items-end">
          <FormField
            control={form.control}
            name="datetime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Event Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-fit pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {selectedDate ? (
                          format(selectedDate, "PPP", { locale: es })
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate || undefined}
                      onSelect={(date) => setSelectedDate(date || null)}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Time</FormLabel>
                <InputWithFocus
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-fit"
                />
              </FormItem>
            )}
          />
          <Button type="button" onClick={handleAddDateTime}>
            add date
          </Button>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
