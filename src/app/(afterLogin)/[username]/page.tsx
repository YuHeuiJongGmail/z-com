import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import BackButton from "../_component/BackButton";
import Post from "../_component/Post";
import style from "./profile.module.css";
import UserPosts from "./_component/UserPosts";
import UserInfo from "./_component/UserInfo";
import { getUserServer } from "./_lib/getUserServer";
import { getUserPosts } from "./_lib/getUserPosts";
import { auth } from "@/auth";
import { Metadata } from "next";
import { User } from "@/model/User";

type Props = {
  params: { username: string };
};

// export async function generateMeatadata({ params }: Props): Promise<Metadata> {
//   // const user: User = await getUserServer(params.username);
//   const user: User = await getUserServer({
//     queryKey: ["users", params.username],
//   });
//   return {
//     title: `${user.nickname} ${user.id} / Z`,
//     description: `${user.nickname} ${user.id} 프로필`,
//   };
// }
export async function generateMetadata({ params }: Props) {
  const user: User = await getUserServer({
    queryKey: ["users", params.username],
  });
  return {
    title: `${user.nickname} (${user.id}) / Z`,
    description: `${user.nickname} (${user.id}) 프로필`,
  };
}

export default async function Profile({ params }: Props) {
  // const user = {
  //   id: "zerohch0",
  //   nickname: "제로초",
  //   image: "/5Udwvqim.jpg",
  // };
  const { username } = params;
  const session = await auth();

  //서버용
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users", username],
    queryFn: getUserServer,
  });

  await queryClient.prefetchQuery({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} session={session} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
}
