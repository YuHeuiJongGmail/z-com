"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getFollowingPosts } from "@/app/(afterLogin)/home/_lib/getFollowingPosts";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import styles from "@/app/(afterLogin)/home/home.module.css";

export default function FollowingPosts() {
  //page에서 prefetch하지 않은 함수이기 때문에, 이부분은 클라이언트렌더링(fetching on client)
  // const { data, isPending } = useQuery<IPost[]>({
  //   queryKey: ["posts", "followings"],
  //   queryFn: getFollowingPosts,
  //   staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
  //   gcTime: 300 * 1000,
  // });
  const { data, isPending } = useSuspenseQuery<IPost[]>({
    //useSuspenseQuery를 쓰면 page의 suspense태그를 인식하여 fallback의 로딩화면을 사용한다.
    queryKey: ["posts", "followings"],
    queryFn: getFollowingPosts,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });
  // //클라이언트 리액트쿼리 로딩처리, useSuspenseQuery를 쓰면 더이상 필요없음.
  // if (isPending) {
  //   return (
  //     <div style={{ display: "flex", justifyContent: "center" }}>
  //       <svg
  //         className={styles.loader}
  //         height="100%"
  //         viewBox="0 0 32 32"
  //         width={40}
  //       >
  //         <circle
  //           cx="16"
  //           cy="16"
  //           fill="none"
  //           r="14"
  //           strokeWidth="4"
  //           style={{ stroke: "rgb(29, 155, 240)", opacity: 0.2 }}
  //         ></circle>
  //         <circle
  //           cx="16"
  //           cy="16"
  //           fill="none"
  //           r="14"
  //           strokeWidth="4"
  //           style={{
  //             stroke: "rgb(29, 155, 240)",
  //             strokeDasharray: 80,
  //             strokeDashoffset: 60,
  //           }}
  //         ></circle>
  //       </svg>
  //     </div>
  //   );
  // }

  return data?.map((post) => <Post key={post.postId} post={post} />);
}
