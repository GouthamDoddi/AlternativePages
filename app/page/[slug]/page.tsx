import { fetchPages } from "@/app/api";
import { Page as PageInterface } from "@/lib/types";

import { findPageByPath } from "../../PageController";
import PageList from "./components/pageList";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  const pages: PageInterface[] = await fetchPages();

  const page = findPageByPath(pages, `/${slug}`);

  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <div className="container mx-auto flex-grow flex flex-col items-center justify-center py-8">
      <h1>{page.title}</h1>
      <p>{page.content}</p>
      <PageList slug={slug} pages={page.children} />
    </div>
  );
}
