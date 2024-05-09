import { Page } from "@/lib/types";

const baseUrl = "http://localhost:8000";

export const fetchPages = async (): Promise<Page[]> => {
  const response = await fetch(`${baseUrl}/api/pages`);
  const data = await response.json();
  return data.pages;
};
