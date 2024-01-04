"use client";
import SearchForm from "./SearchForm";
import style from "./rightSearchZone.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function RightSearchZone() {
  const pathname = usePathname(); //useSelectedSegment와 비슷 "/" 있고 없고의 차이
  const searchParams = useSearchParams(); //useSearchParams, {params}페이지에서 :슬러거 가져옴.
  const router = useRouter();
  const onChangeFollow = () => {
    // let url = `/search?${searchParams.toString()}&pf=on`;
    // let url = `/search?q=${searchParams.get("q")}&pf=on`;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("pf", "on");
    router.replace(`/search?${newSearchParams.toString()}`);

    // if (searchParams.has("f")) {
    //   url += `&f=${searchParams.get("f")}`;
    // }
    // router.replace(url);
  };
  const onChangeAll = () => {
    // let url = `/search?q=${searchParams.get("q")}`;
    // if (searchParams.has("f")) {
    //   url += `&f=${searchParams.get("f")}`;
    // }
    // router.replace(url);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("pf");
    router.replace(`/search?${newSearchParams.toString()}`);
  };

  if (pathname === "/explore") return null;
  if (pathname === "/search") {
    return (
      <div>
        <h5 className={style.filterTitle}>검색 필터</h5>
        <div className={style.filterSection}>
          <div>
            <label>사용자</label>
            <div className={style.radio}>
              <div>모든 사용자</div>
              <input
                type="radio"
                name="pf"
                defaultChecked
                onChange={onChangeAll}
              />
            </div>
            <div className={style.radio}>
              <div>내가 팔로우하는 사람들</div>
              <input
                type="radio"
                name="pf"
                value="on"
                onChange={onChangeFollow}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ marginBottom: 60, width: "inherit" }}>
      <SearchForm />
    </div>
  );
}
