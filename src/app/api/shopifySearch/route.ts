import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { query } = await request.json();

  if (!query) {
    return NextResponse.json({ error: "No search query provided" }, { status: 400 });
  }

  try {
    const response = await fetch(`${process.env.SHOPIFY_STORE_URL}/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN, 
      } as HeadersInit,
      body: JSON.stringify({
        query: `
          query {
            products(first: 10, query: "${query}") {
              edges {
                node {
                  id
                  title
                  description
                  images(first: 1) {
                    edges {
                      node {
                        originalSrc
                      }
                    }
                  }
                  variants(first: 1) {
                    edges {
                      node {
                        price {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    });

    const result = await response.json();

    const products = result.data.products.edges.map(({ node }: { node: any }) => ({
      id: node.id,
      title: node.title,
      image: node.images.edges[0]?.node || { originalSrc: "/placeholder.png" },
      description: node.description || "No description available",
      price: node.variants.edges[0]?.node.price.amount || "N/A",
      currency: node.variants.edges[0]?.node.price.currencyCode || "N/A",
    }));
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Error fetching products" }, { status: 500 });
  }
}
