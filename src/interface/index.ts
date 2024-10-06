export interface Product {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: string;
  handle: string;
  updated_at: string;
  published_at: string;
  template_suffix: string;
  published_scope: string;
  tags: string;
  status: string;
  admin_graphql_api_id: string;
  variants: Variant[];
  options: Option[];
  images: Image[];
  image: Image;
  rating?: number;
  numReviews?: number;
  category?: string;
  variantId?: number;
}

interface Variant {
  id: number;
  product_id: number;
  title: string;
  price: string;
  position: number;
  inventory_policy: string;
  compare_at_price: string;
  option1: string;
  option2: string | null;
  option3: string | null;
  created_at: string;
  updated_at: string;
  taxable: boolean;
  barcode: string;
  fulfillment_service: string;
  grams: number;
  inventory_management: string;
  requires_shipping: boolean;
  sku: string;
  weight: number;
  weight_unit: string;
  inventory_item_id: number;
  inventory_quantity: number;
  old_inventory_quantity: number;
  admin_graphql_api_id: string;
  image_id: number | null;
}

interface Option {
  id: number;
  product_id: number;
  name: string;
  position: number;
  values: string[];
}

export interface Image {
  id: number;
  alt: string | null;
  position: number;
  product_id: number;
  created_at: string;
  updated_at: string;
  admin_graphql_api_id: string;
  width: number;
  height: number;
  src: string;
  variant_ids: number[];
}

export interface ProductsList {
  _id: number;
  productName: string;
  price: string;
  badge?: string;
  des: string;
  quantity: number;
  title: string;
  image: string;
  description: string;
  tags: string;
  originalPrice: number | string;
  salePrice: number | string;
  sku: string;
  weight: number;
  variantId?: number;
}

export interface IProduct {
  _id: string | number;
  quantity: number;
  price: number | string;
  title: string;
  image: string;
  description: string;
  category?: string;
  rating?: number;
  numReviews?: number;
  countInStock?: number;
  images?: string[];
  position?: number;
  tags: string;
  originalPrice?: number | string;
  salePrice?: number | string;
  sku?: string;
  weight?: number;
  status?: string;
  vendor?: string;
  type?: string;
  variantId?: number;
}

export interface CartProduct {
  _id: string | number;
  title: string;
  price: number | string; 
  quantity: number;
  image: string;
  description: string;
  tags: string;
  originalPrice: number; 
  salePrice: number;
  sku: string;
  vendor: string;
  totalPrice: number;
  variantId: string;
}
