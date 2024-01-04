"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Post as IPost } from "@/model/Post";
import Post from "@/app/(afterLogin)/_component/Post";
import { getUserPosts } from "../_lib/getUserPosts";

type Props = {
  username: string;
};
export default function UserPosts({ username }: Props) {
  const { data } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
    staleTime: 60000, //fresh -> stale time, 최대 5분
    gcTime: 300 * 1000, //inactive 상태일때 gc타임 최대 5분
  });

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["users", username]); //서버에서 값을 가져오는게 아니라 이미 가져온 캐쉬에서 컴포넌트간 데이터 공유로 가져온다.
  console.log("user", user);
  if (user) {
    return data?.map((post) => <Post key={post.postId} post={post} />);
  }
  return null;
}
