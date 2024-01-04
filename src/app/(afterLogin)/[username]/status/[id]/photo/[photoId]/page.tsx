import Home from "@/app/(afterLogin)/home/page";

type Props = {
  params: {
    username: string;
    id: string;
    photoId: string;
  };
};

export default function Page({ params }: Props) {
  params.username; //elonmusk
  params.id; //1
  params.photoId; //1
  //usesearchParams 처럼 params를 가져올수 있다([슬러그값])
  return <Home />;
}
