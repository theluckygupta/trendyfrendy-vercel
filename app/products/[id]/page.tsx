import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import {
  notFound,
} from "next/navigation";

import ProductClient from "@/app/components/ProductClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const { id } =
    await params;

  const docRef = doc(
    db,
    "products",
    id
  );

  const docSnap =
    await getDoc(docRef);

  if (!docSnap.exists()) {

    return {

      title:
        "Product Not Found",

    };

  }

  const product: any =
    docSnap.data();

  return {

    title:
      `${product.name} | TrendyFrendy`,

    description:
      product.shortDescription,

    openGraph: {

      title:
        product.name,

      description:
        product.shortDescription,

      images: [
        product.mainImage,
      ],

    },

    twitter: {

      card:
        "summary_large_image",

      title:
        product.name,

      description:
        product.shortDescription,

      images: [
        product.mainImage,
      ],

    },

  };

}

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const { id } =
    await params;

  const docRef = doc(
    db,
    "products",
    id
  );

  const docSnap =
    await getDoc(docRef);

  if (!docSnap.exists()) {

    notFound();

  }

  const product = {

    id:
      docSnap.id,

    ...docSnap.data(),

  };

  return (

    <ProductClient
      product={product}
    />

  );

}