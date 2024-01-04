// "use client";    //2. 빌드시 에러남으로 다시 서버컴포넌트로 바꿈 ==> 페이지는 서버 컴포넌트로 만들기.
import { redirect, useRouter } from "next/navigation";
import Main from "../_component/Main";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";
import RedirectToLogin from "@/app/(beforeLogin)/login/_component/RedirectToLogin";

export default async function Login() {
  // redirect("/i/flow/login"); //서버컴포넌트일때 redirect를 쓰면 인터셉터 라우팅이 동작하지 않았음
  // const router = useRouter();
  // const { data: session } = useSession();
  const session = await auth();
  if (session?.user) {
    // router.replace("/home");
    redirect("/home");
    return null;
  }

  // router.replace("/i/flow/login"); //라우터를 꼭써야 인터셉터 라우트가 동작한다.때문에 별도의 컴포넌트로 뺀다.(중요)
  // return null;
  // return <Main />;
  return (
    <>
      <RedirectToLogin />
      <Main />
    </>
  );
}

//인터셉터는 클라이언트에서 동작하므로 서버컴포넌트가 아닌 클라이언트 컴포넌트로 설정한다.
//redirect는 서버용이므로 클라이언트용인 useRouter (혹은 Link)를 사용한다.
