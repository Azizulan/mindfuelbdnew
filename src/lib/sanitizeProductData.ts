import { IProduct, Product, ProductsList } from "@/interface";

export const sanitizeProductArrayData = (
  products: Product[]
): ProductsList[] => {
  const sanitizedProducts =
    products &&
    products.map((item) => {
      return {
        _id: item.id,
        img: item.image?.src || "",
        productName: item.title,
        price: item.variants[0]?.price || 0,
        color: item.options[0]?.values[0] || "",
        badge: item.status === "active" ? "New" : "",
        des: item.body_html,
        description: item.body_html,
        quantity: item.variants[0]?.inventory_quantity || 0,
        title: item.title,
        image: item.image?.src || "",
        tags: item.tags || "",
        originalPrice: item.variants[0]?.compare_at_price || 0,
        salePrice: item.variants[0]?.price || 0,
        sku: item.variants[0]?.sku || "",
        weight: item.variants[0]?.weight || 0,
        variantId: item.variants[0].id,
      };
    });

  return sanitizedProducts as ProductsList[];
};

export const sanitizeProductData = (product: Product): IProduct | null => {
  if (!product) {
    return null;
  }

  return {
    _id: product.id,
    title: product.title,
    price: product.variants[0]?.price || 0,
    image: product.image?.src || "",
    description: product.body_html,
    quantity: product.variants[0]?.inventory_quantity || 0,
    countInStock: product.variants[0]?.inventory_quantity || 0,
    rating: product?.rating || 0,
    numReviews: product?.numReviews || 0,
    category: product?.category || "",
    images: product?.images?.map((image) => image.src) || [],
    position: product?.variants[0]?.position || 0,
    tags: product?.tags || "",
    originalPrice: product?.variants[0]?.compare_at_price || 0,
    salePrice: product?.variants[0]?.price || 0,
    sku: product?.variants[0]?.sku || "",
    weight: product?.variants[0]?.weight || 0,
    status: product?.status || "",
    vendor: product?.vendor || "",
    type: product?.product_type || "",
    variantId:
      typeof product?.variants[0]?.id === "number"
        ? product?.variants[0]?.id
        : undefined,
  };
};

