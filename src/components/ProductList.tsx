import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

const PRODUCT_PER_PAGE = 20;

const ProductList = async ({
    categoryId,
    limit,
}: {
    categoryId?: string; // Make categoryId optional for better handling
    limit?: number;
}) => {
    const wixClient = await wixClientServer();

    // Validate categoryId
    if (!categoryId) {
        console.error("Error: categoryId is required.");
        return <div>Error: categoryId is required.</div>;
    }

    try {
        const res = await wixClient.products
            .queryProducts()
            .eq("collectionIds", categoryId)
            .limit(limit || PRODUCT_PER_PAGE)
            .find();

        // Check if any products were returned
        if (!res.items || res.items.length === 0) {
            console.warn("No products found for the given categoryId.");
            return <div>No products found.</div>;
        }

        return (
            <div className='mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap'>
                {res.items.map((product: products.Product) => (
                    <Link href={"/" + product.slug} className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]" key={product._id}>
                        <div className="relative w-full h-80">
                            <Image
                                src={product.media?.mainMedia?.image?.url || "/default-product.png"}
                                alt={product.name || "Product Image"}
                                fill
                                sizes="25vw"
                                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500"
                            />
                            {product.media?.items && product.media.items.length > 1 && (
                                <Image
                                    src={product.media.items[1]?.image?.url || "/default-product.png"}
                                    alt={product.name || "Product Image"}
                                    fill
                                    sizes="25vw"
                                    className="absolute object-cover rounded-md"
                                />
                            )}
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">{product.name}</span>
                            <span className="font-semibold">{product.price?.price}</span>
                        </div>
                        {product.additionalInfoSections && (
                            <div className="text-sm text-gray-500" dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                    product.additionalInfoSections.find(
                                        (section: any) => section.title === "shortDesc"
                                    )?.description || ""
                                ),
                            }} 
                            ></div>
                        )}
                        <button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white">
                            Add to Cart
                        </button>
                    </Link>
                ))}
            </div>
        );
    } catch (error) {
        console.error("Error fetching products:", error);
        return <div>Error fetching products. Please try again later.</div>;
    }
};

export default ProductList;
