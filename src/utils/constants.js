export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://taskmanager-rkqg.onrender.com"
    : "http://localhost:3000";

export const taskCategories = [
  { id: "backlog", label: "Backlog" },
  { id: "todo", label: "To do" },
  { id: "progress", label: "In progress" },
  { id: "done", label: "Done" },
];

export const priorityColors = {
  high: "#FF2473",
  moderate: "#18B0FF",
  low: "#63C05B",
};

export const categories = {
  backlog: [
    { label: "TO-DO", key: "todo" },
    { label: "PROGRESS", key: "progress" },
    { label: "DONE", key: "done" },
  ],
  todo: [
    { label: "BACKLOG", key: "backlog" },
    { label: "PROGRESS", key: "progress" },
    { label: "DONE", key: "done" },
  ],
  progress: [
    { label: "BACKLOG", key: "backlog" },
    { label: "TO-DO", key: "todo" },
    { label: "DONE", key: "done" },
  ],
  done: [
    { label: "BACKLOG", key: "backlog" },
    { label: "PROGRESS", key: "progress" },
    { label: "TO-DO", key: "todo" },
  ],
};

export const shareTaskUrl =
  process.env.NODE_ENV === "production"
    ? "https://srinivas-pro-manager.vercel.app/"
    : "http://localhost:5173/";
