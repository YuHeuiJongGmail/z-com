import styles from "./main.module.css";
import Link from "next/link";
import Image from "next/image";
import zLogo from "../../../../public/zlogo.png";
export default function Main() {
  return (
    <>
      <div className={styles.left}>
        <Image src={zLogo} alt="logo"></Image>
      </div>
      <div className={styles.right}>
        <h1>지금 일어나고 있는 일</h1>
        <h2>지금 가입하세요.</h2>
        <Link href="/i/flow/signup" className={styles.signup}>
          계정 만들기
        </Link>
        <h3>이미 트위터에 가입하셨나요?</h3>
        <Link href="/login" className={styles.login}>
          로그인
        </Link>
      </div>
    </>
  );
}

//인터셉터는 클라이언트에서 동작하므로 서버컴포넌트가 아닌 클라이언트 컴포넌트로 설정한다.
//redirect는 서버용이므로 클라이언트용인 useRouter (혹은 Link)를 사용한다.
