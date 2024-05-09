import { fetchPages } from "@/app/api";
import { Page as PageInterface } from "@/lib/types";

import { findPageByPath } from "../../../PageController";

interface ChildPageProps {
  params: {
    slug: string;
    childSlug: string;
  };
}

export default async function ChildPage({ params }: ChildPageProps) {
  const { slug, childSlug } = params;
  const path = `/${slug}/${childSlug}`;
  console.log(path);
  const pages: PageInterface[] = await fetchPages();
  const page = findPageByPath(pages, path);

  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <div className="container mx-auto flex-grow flex flex-col items-center justify-center py-8">
      <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
      <p className="text-lg text-gray-700">{page.content}</p>
    </div>
  );
}
