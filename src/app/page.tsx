// import Image from "next/image";
import { connection } from "next/server";
import { fetchImage } from "./fetch-image";
import {CatImage} from "./cat-image";

export default async function Home() {
  await connection();
  const image = await fetchImage();
  console.log("page: 画像を取得", image);
  return (
    <>
      <CatImage url={image.url} />
    </>
  )
}
