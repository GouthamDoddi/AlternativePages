"use client";

import React from "react";

import { Page } from "@/lib/types";

import PageListItem from "./pageItem";

interface PageListProps {
  pages: Page[];
  url: string;
}

const PageList: React.FC<PageListProps> = ({ pages, url }) => {
  const onDelete = (id: number) => {
    console.log(id);
    pages.splice(
      pages.findIndex((e) => e.id === id),
      1,
    );
  };

  console.log(pages, "pages");

  return (
    <div className="container mx-auto flex-grow flex flex-col items-center justify-center py-8">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
        <h2 className="text-2xl font-bold mb-4">List of Pages</h2>
        <ul className="space-y-2">
          {pages.map((page, index) => (
            <PageListItem url={url} key={index} page={page} onDelete={onDelete} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PageList;
