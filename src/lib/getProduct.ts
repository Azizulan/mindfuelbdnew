"use server";

import { GraphQLClient } from "graphql-request";

const url = `${process.env.SHOPIFY_STORE_URL}admin/api/2021-07/products.json`;
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
const endpoint = `${process.env.SHOPIFY_STORE_URL}/api/2024-10/graphql.json`;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function getProducts() {
  try {
    console.log(url);
    console.log("SHOPIFY_ACCESS_TOKEN", SHOPIFY_ACCESS_TOKEN);
    
    
    const product = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN 
      } as HeadersInit,
    }); 
    console.log(product);  
    
    const productData = await product.json();
    return productData;
  } catch (err) {
    console.log(err);
  }
}

export async function getProductById(id: string) {
  const url = `${process.env.SHOPIFY_STORE_URL}/admin/api/2024-10/products/${id}.json`;
  const product = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
    } as HeadersInit,
  });
  const productData = await product.json();

  return productData;
}

// GraphQL Client for Storefront API
const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
  } as HeadersInit,
});

// Fetch all products using Shopify Storefront API (GraphQL)
export async function getAllProducts() {
  try {
    const query = `
          {
              products(sortKey: TITLE, first: 100) {
                  edges {
                      node {
                          id
                          title
                          description
                      }
                  }
              }
          }
      `;

    const response = await graphQLClient.request(query);
    return response;
  } catch (error) {
    console.error("Error fetching all products via GraphQL:", error);
    return { error: "Failed to fetch products from GraphQL." }; // Return an error message
  }
}

