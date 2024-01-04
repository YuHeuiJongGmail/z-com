import { auth } from "@/auth";
import Main from "./_component/Main";
import { redirect } from "next/navigation";

export default async function Home() {
  const sesstion = await auth(); //useSession()의 서버버전용
  if (sesstion?.user) {
    redirect("/home"); //서버용, 클라이언트는 useRouter
    return null;
  }
  return <Main />;
}
