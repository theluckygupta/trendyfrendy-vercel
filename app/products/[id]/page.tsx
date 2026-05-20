import Navbar from "@/components/Navbar";

import ProductClient from "@/app/components/ProductClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const {
    id,
  } = await params;

  return (

    <>

      <Navbar cartCount={0} />

      <div className="pt-24 bg-[#0a0a0a]">
c
        <ProductClient
          productId={id}
        />

      </div>

    </>

  );

}