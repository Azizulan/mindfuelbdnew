"use server";
import { cookies } from "next/headers";
import { z } from "zod";

// Shopify REST API endpoint
const url = `${process.env.SHOPIFY_STORE_URL}/admin/api/2024-01/customers.json`;
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

// GraphQL endpoint
const GRAPHQL_ENDPOINT = `${process.env.SHOPIFY_STORE_URL}/api/2024-10/graphql.json`;
const shopify_storefront_access_token =
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export const registerAction = async (data: object) => {
  const schema = z.object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().nonempty("Phone number is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .nonempty("Password is required"),
    address: z.string().nonempty("Address is required"),
    city: z.string().nonempty("City is required"),
    zip: z.string().nonempty("ZIP code is required"),
  });

  const User = schema.parse(data);

  const nesUser = {
    customer: {
      first_name: User.firstName,
      last_name: User.lastName,
      email: User.email,
      phone: User.phone,
      password: User.password,
      addresses: [
        {
          address1: User.address,
          city: User.city,
          zip: User.zip,
        },
      ],
      password_confirmation: User.password,
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
      } as HeadersInit,
      body: JSON.stringify(nesUser),
    });

    await response.json();

    return { success: true, message: "User created successfully", status: 200 };
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    return {
      success: false,
      message: "Failed to create user",
      error: error instanceof Error ? error.message : String(error),
      status: 500,
    };
  }
};

// Function to log in a user using GraphQL
export const loginAction = async (data: object) => {
  const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const User = schema.parse(data);

  const query = `
    mutation SignInWithEmailAndPassword($email: String!, $password: String!) {
      customerAccessTokenCreate(input: { email: $email, password: $password }) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          message
        }
      }
    }
  `;

  const variables = {
    email: User.email,
    password: User.password,
  };

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": shopify_storefront_access_token,
      } as HeadersInit,
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();

    // Check for errors in the response
    const userErrors = data.data.customerAccessTokenCreate.customerUserErrors;
    if (userErrors.length > 0) {
      return {
        success: false,
        message: userErrors[0].message,
        status: 400,
      };
    }

    // Successful login, return the access token
    const accessToken =
      data.data.customerAccessTokenCreate.customerAccessToken.accessToken;

    // Set the access token in the cookies
    cookies().set("MindFuel_accessToken", accessToken, {
      // httpOnly: true,
      // secure: true, 
      // sameSite: "strict",
      maxAge: 60 * 60 * 24 * 10,
    });

    return {
      success: true,
      accessToken,
      expiresAt:
        data.data.customerAccessTokenCreate.customerAccessToken.expiresAt,
      status: 200,
    };
  } catch (error: unknown) {
    console.error(error instanceof Error ? error.message : String(error));
    return {
      success: false,
      message: "Failed to log in",
      error: error instanceof Error ? error.message : String(error),
      status: 500,
    };
  }
};

