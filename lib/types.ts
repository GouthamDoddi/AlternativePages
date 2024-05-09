import { NextApiRequest, NextApiResponse } from "next";
import { MockRequest, MockResponse } from "node-mocks-http";

export type MockNextApiRequest<T = any> = MockRequest<NextApiRequest> & {
  body: T;
};

export type MockNextApiResponse<T = any> = MockResponse<NextApiResponse> & {
  body: T;
};

export interface Page {
  id: number;
  parentId: number | null;
  slug: string;
  title: string;
  content: string;
  children: Page[];
}
