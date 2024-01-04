import { Suspense } from "react";
import TabDecider from "./TabDecider";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getPostRecommends } from "../_lib/getPostRecommends";

export default async function TabDeciderSuspense() {
  //서버용
  const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["posts", "recommends"],
  //   queryFn: getPostRecommends,
  // });
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <TabDecider />
    </HydrationBoundary>
  );
}
