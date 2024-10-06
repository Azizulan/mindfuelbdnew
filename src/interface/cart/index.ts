export interface CartInfo {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: Array<{
    id: string;
    quantity: number;
    cost: {
      totalAmount: {
        amount: string;
        currencyCode: string;
      };
    };
    
    merchandise: {
      id: string;
      title: string;
      selectedOptions: Array<{
        name: string;
        value: string;
      }>;
      product: {
        id: string;
        handle: string;
        availableForSale: boolean;
        title: string;
        description: string;
        descriptionHtml: string;
        options: Array<{
          id: string;
          name: string;
          values: string[];
        }>;
        priceRange: {
          maxVariantPrice: {
            amount: string;
            currencyCode: string;
          };
          minVariantPrice: {
            amount: string;
            currencyCode: string;
          };
        };
        featuredImage: {
          url: string;
          altText: string | null;
          width: number;
          height: number;
        };
        images: Array<{
          node: {
            url: string;
            altText: string | null;
            width: number;
            height: number;
          };
        }>;
        seo: {
          description: string | null;
          title: string | null;
        };
        tags: string[];
        updatedAt: string;
      };
    };

  }>;
  totalQuantity: number;
}



export interface CartProduct {
  id: string;  
  title: string;  
  variant: string;  
  quantity: number;  
  price: number;  
  totalCost: string;  
  image?: string;  
}

export interface TransformedCartInfo {
  totalItems: number;  
  totalCost?: string;  
  currency?: string;  
  products: CartProduct[];
}