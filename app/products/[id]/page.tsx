import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase";

import ProductClient from "@/app/components/ProductClient";

export async function generateMetadata({
  params,
}: {
  params: {
    id: string;
  };
}) {

  try {

    const docRef = doc(
      db,
      "products",
      params.id
    );

    const docSnap =
      await getDoc(docRef);

    if (!docSnap.exists()) {

      return {
        title:
          "Product Not Found | TrendyFrenzy",
      };

    }

    const product: any =
      docSnap.data();

    const image =
      product.mainImage ||
      product.images?.[0] ||
      "/icon.png";

    return {

      title: `${product.name} | TrendyFrenzy`,

      description:
        product.shortDescription ||
        "Luxury fashion by TrendyFrenzy",

      openGraph: {

        title: product.name,

        description:
          product.shortDescription,

        images: [image],

        type: "website",

      },

      twitter: {

        card:
          "summary_large_image",

        title:
          product.name,

        description:
          product.shortDescription,

        images: [image],

      },

    };

  } catch (error) {

    console.log(error);

    return {

      title:
        "TrendyFrenzy",

    };

  }

}

export default function ProductPage() {

  return <ProductClient />;

}