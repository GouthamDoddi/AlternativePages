import { Page } from "@/lib/types";

import { fetchPages } from "./api";
import ModalHandeler from "./components/modalHandeler";
import PageList from "./components/pageList";

export default async function CMS() {
  const pages: Page[] = await fetchPages();

  return (
    <>
      <ModalHandeler />

      <h1>Content Management System</h1>
      <PageList url={`/page`} pages={pages} />
    </>
  );
}
