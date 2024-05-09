// import { pages } from "@/app/data";
import { Page } from "@/lib/types";

import { fetchPages } from "./api";

interface PageControllerProps {
  path: string;
}

export default async function PageController({ path }: PageControllerProps) {
  const pages = await fetchPages();

  const page = findPageByPath(pages, path);

  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <div>
      <h1>{page.title}</h1>
      <p>{page.content}</p>
    </div>
  );
}

export const findPageByPath = (pages: Page[], path: string) => {
  const slugs = path.split("/").filter((slug) => slug.trim() !== "");

  const findPage = (pages: Page[], slugIndex: number = 0): Page | null => {
    if (slugIndex >= slugs.length) {
      return null;
    }

    const currentSlug = slugs[slugIndex];
    const page = pages.find((page) => page.slug === currentSlug);

    if (!page) {
      return null;
    }

    if (slugIndex === slugs.length - 1) {
      return page;
    }

    return findPage(page.children, slugIndex + 1);
  };

  return findPage(pages);
};
