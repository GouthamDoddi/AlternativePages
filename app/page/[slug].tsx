import { useRouter } from "next/router";

import PageController from "../PageController";

export default function PageRoute() {
  const router = useRouter();
  const { slug } = router.query;
  const path = Array.isArray(slug) ? slug.join("/") : slug || "";

  return <PageController path={`/${path}`} />;
}
