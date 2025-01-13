export const formatDateTime = (datetime: any) =>
  new Date(datetime).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
