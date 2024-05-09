"use client";

import React, { useState } from "react";

import { Page } from "@/lib/types";

import { fetchPages } from "../api";

interface NewPageModalProps {
  onPageCreated: () => void;
}

const NewPageModal: React.FC<NewPageModalProps> = ({ onPageCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [parentId, setParentId] = useState<number | null>(null);
  const [pages, setPages] = useState<Page[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPage: Page = {
      id: 0, // This will be assigned by the server
      parentId,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      title,
      content,
      children: [],
    };

    try {
      const response = await fetch(`${process.env.NEXT_BASE_URL}/api/pages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPage),
      });

      if (response.ok) {
        onPageCreated();
        setTitle("");
        setContent("");
        setParentId(null);
      } else {
        console.error("Failed to create new page");
      }
    } catch (error) {
      console.error("Error creating new page:", error);
    }
  };

  const fetchNonLeafPages = async () => {
    const pagesData = await fetchPages();
    const nonLeafPages = pagesData.filter((page) => page.children.length > 0);
    setPages(nonLeafPages);
  };

  useState(() => {
    fetchNonLeafPages();
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create New Page</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block font-bold mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3"></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="parentId" className="block font-bold mb-2">
              Parent Page
            </label>
            <select
              id="parentId"
              value={parentId ?? ""}
              onChange={(e) => setParentId(e.target.value ? parseInt(e.target.value) : null)}
              className="w-full border border-gray-300 rounded-md py-2 px-3">
              <option value="">No Parent</option>
              {pages.map((page) => (
                <option key={page.id} value={page.id}>
                  {page.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Create
            </button>
          </div>
        </form>
      </div>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50"></div>
    </div>
  );
};

export default NewPageModal;
