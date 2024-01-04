import { QueryFunction } from "@tanstack/query-core";
import { Post } from "@/model/Post";
import { cookies } from "next/headers";

export const getSinglePostServer = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [_1, id] = queryKey;
  const res = await fetch(`http://localhost:9090/api/posts/${id}`, {
    next: {
      tags: ["posts", id],
    },
    credentials: "include", //서버(prefetch)에서 실행되는 것은 include해도 브라우저에 쿠키가 전달되지 않는다.
    headers: { Cookie: cookies().toString() }, //때문에 이렇게 셋팅한다. 이렇게 하면 서버에서도 브라우저에 쿠키를 전달할 수 있다.
    cache: "no-store",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
