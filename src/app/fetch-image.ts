"use server";

// import { CAT_API_KEY } from "./env";

type Image = {
  url: string;
}

export async function fetchImage() : Promise<Image> {
  const res = await fetch("https://api.thecatapi.com/v1/images/search"
    // , {
    // headers: {
    //   "x-api-key": CAT_API_KEY
    // }  }
  );
  
  const images : unknown = await res.json();
  console.log("fetchImage: 画像を取得", images);
  if (!isImageArray(images)){
    throw new Error("画像の形式が不正です");
  }

  if (!images[0]){
    throw new Error("画像が取得できませんでした");
  }
  return images[0];
}

function isImageArray(value: unknown) : value is Image[]{
  if (!Array.isArray(value)){
    return false;
  }
  if (!value.every(isImage)){
    return false;
  }
  return true;
}

function isImage(value: unknown) : value is Image{
  if (typeof value !== "object" || value === null){
    return false;
  }
  if (!("url" in value)){
    return false;
  }
  if (typeof (value as Image).url !== "string"){
    return false;
  }
  return true;
}