import { createMocks } from "node-mocks-http";

import { MockNextApiRequest, MockNextApiResponse } from "@/lib/types";

import { getAllPages, postPage } from "../controllers/PageController";
import createSlug from "../lib/utils/slug";

describe("getAllPages", () => {
  test("should fetch all pages", async () => {
    const { req, res } = createMocks<MockNextApiRequest, MockNextApiResponse>();

    const next = jest.fn();

    await getAllPages(req, res, next);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      status: "success",
      data: {
        notes: expect.any(Array),
      },
    });
  });
});

describe("postPage", () => {
  test("should create a new page", async () => {
    const { req, res } = createMocks<MockNextApiRequest, MockNextApiResponse>({
      method: "POST",
      body: {
        title: "Test Page",
        content: "Test Content",
        parentId: null,
      },
    });

    const next = jest.fn();

    await postPage(req, res, next);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      status: "success",
      data: {
        title: "Test Page",
        content: "Test Content",
        parentId: null,
        slug: createSlug("Test Page"),
      },
    });
  });
});
