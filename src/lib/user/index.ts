const FETCH_CUSTOMER_INFO = `
  query FetchCustomerInfo($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      email
      firstName
      id
      lastName
      phone
      displayName
      defaultAddress {
        id
      }
      addresses(first: 100) {
        edges {
          node {
            address1
            city
            country
            id
            province
            zip
          }
        }
      }
    }
  }
`;


const SHOPIFY_STOREFRONT_API_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_STORE_URL = `${process.env.SHOPIFY_STORE_URL}/api/2024-10/graphql.json`;


export const fetchCustomerInfo = async (accessToken: string) => {
  const res = await fetch(SHOPIFY_STORE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_API_TOKEN,
      } as HeadersInit,
    body: JSON.stringify({ query: FETCH_CUSTOMER_INFO, variables: { customerAccessToken: accessToken } }),
  });

  const data = await res.json();
  return data;
};
