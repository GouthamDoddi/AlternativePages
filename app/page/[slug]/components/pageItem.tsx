"use client";

import Link from "next/link";
import { useState } from "react";

import { Page } from "@/lib/types";

interface PropType {
  page: Page;
  onDelete: (id: number) => void;
  slug: string;
}

const PageListItem: React.FC<PropType> = ({ page, onDelete, slug }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/pages/${page.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setIsDeleted(true);
        onDelete(page.id);
      } else {
        console.error("Failed to delete page");
      }
    } catch (error) {
      console.error("Error deleting page:", error);
    }
  };

  return (
    <li key={page.id} className={`bg-gray-100 rounded-md p-2 ${isDeleted ? "opacity-50" : ""}`}>
      <div className="flex justify-between items-center">
        <div key={page.id}>
          <Link href={`/page/${slug}/${page.slug}`}>{page.title}</Link>
        </div>
        {!isDeleted && (
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M15 5a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h10zm-9 2a1 1 0 011-1h2a1 1 0 110 2H7a1 1 0 01-1-1zm4 0a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
      {isDeleted && <div className="text-gray-500 text-sm">Page deleted</div>}
    </li>
  );
};

export default PageListItem;
