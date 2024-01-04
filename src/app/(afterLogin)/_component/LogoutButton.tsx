"use client";
import style from "@/app/(afterLogin)/_component/logoutButton.module.css";
import { Session } from "@auth/core/types";
import { useQueryClient } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  me: Session | null;
};
export default function LogoutButton({ me }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  // const { data: me } = useSession();
  // const me = {
  //   id: "zerocho0",
  //   nickname: "제로초",
  //   image: "/5Udwvqim.jpg",
  // };

  const onLogout = () => {
    //로그아웃시 캐쉬 날려주기
    queryClient.invalidateQueries({
      queryKey: ["posts"],
    });
    queryClient.invalidateQueries({
      queryKey: ["users"],
    });
    signOut({ redirect: false }).then(() => {
      //백엔드서버에서도 완전히 로그아웃함
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
        method: "post",
        credentials: "include",
      });
      router.refresh(); //라우터캐쉬 기본 30초를 무효화시킴. 로그아웃후에도 레이아웃에 남아 있는 것을 방지하기 위해
      router.replace("/");
    });
  };
  if (!me) {
    return null;
  }

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.user?.image as string} alt={me.user?.email as string} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div>
    </button>
  );
}
