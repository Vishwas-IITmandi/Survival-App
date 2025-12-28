export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type Model = {
  id: string;
  name: string;
  repo: string;
  filename: string;
  size: string;
  downloadUrl: string;
};
