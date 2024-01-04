import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Post from "../_component/Post";
import TabProvider from "../_component/TabProvider";
import PostForm from "./_component/PostForm";
import Tab from "./_component/Tab";
import style from "./home.module.css";
import { revalidateTag } from "next/cache";
import PostRecommends from "./_component/PostRecommends";
import TabDecider from "./_component/TabDecider";
import { getPostRecommends } from "./_lib/getPostRecommends";
import { Suspense } from "react";
import TabDeciderSuspense from "./_component/TabDeciderSuspense";
import Loading from "./loading";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "홈 / Z",
  description: "홈",
};

// async function getPostRecommends() {
//   const res = await fetch("http://localhost:9090/api/postRecommends", {
//     next: { tags: ["posts", "recommends"] },
//     // cache: "no-store"
//   });
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   //revalidateTag("recommends"); //캐쉬초기화
//   return res.json();
// }

export default async function Home() {
  const session = await auth();
  // //서버용
  // const queryClient = new QueryClient();
  // // await queryClient.prefetchQuery({
  // //   queryKey: ["posts", "recommends"],
  // //   queryFn: getPostRecommends,
  // // });
  // await queryClient.prefetchInfiniteQuery({
  //   queryKey: ["posts", "recommends"],
  //   queryFn: getPostRecommends,
  //   initialPageParam: 0,
  // });
  // const dehydratedState = dehydrate(queryClient);
  // queryClient.getQueryData(["posts", "recommends"]); //서버에서 이미 가져온 값을 다른컴포넌트에서 값을 가져올때 사용. 프로바이더내에서는 가져오기 가능함.
  // queryClient.setQueryData()   //값을 수정할때, 서버에 반영되는 것은 아님.
  return (
    <main className={style.main}>
      {/* <HydrationBoundary state={dehydratedState}> */}
      <TabProvider>
        <Tab />
        <PostForm me={session} />
        <Suspense fallback={<Loading />}>
          <TabDeciderSuspense />
        </Suspense>
      </TabProvider>
      {/* </HydrationBoundary> */}
    </main>
  );
}
