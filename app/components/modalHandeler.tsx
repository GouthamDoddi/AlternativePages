/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import { Page } from "@/lib/types";
import createSlug from "@/lib/utils/slug";

import { fetchPages } from "../api";

const NewPageModal: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [parentId, setParentId] = useState<number | null>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPage = {
      parentId: parentId || null,
      slug: createSlug(title),
      title,
      content,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/pages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPage),
      });

      if (response.ok) {
        setTitle("");
        setContent("");
        setParentId(null);
        setIsModalOpen(false);
      } else {
        console.error("Failed to create new page");
      }
    } catch (error) {
      console.error("Error creating new page:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pages: Page[] = await fetchPages();
        let childern: Page[] = [...pages];

        for (let i = 0; i < pages.length; i++) {
          childern = [...childern, ...pages[i].children];
        }

        console.log(childern);

        setPages(childern);
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsModalOpen(true)}>
        Create New Page
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Create New Page"
        ariaHideApp={false}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50">
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
            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Close
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Create
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default NewPageModal;
