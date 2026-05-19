'use server';

import { createCustomer, createCustomerAccessToken, getCustomer } from "@/lib/shopify";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function register(prevState: any, formData: FormData) {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const password = formData.get('password') as string;

  try {
    const result = await createCustomer({
      firstName,
      lastName,
      email,
      phone: phone.startsWith('+') ? phone : `+212${phone.replace(/^0/, '')}`,
      password,
    });

    if (result?.customerUserErrors?.length > 0) {
      return { error: result.customerUserErrors[0].message };
    }

    // After registration, log them in
    const loginResult = await createCustomerAccessToken({
      email,
      password,
    });

    if (loginResult?.customerUserErrors?.length > 0) {
      return { error: "Compte créé mais erreur de connexion. Veuillez vous connecter manuellement." };
    }

    const accessToken = loginResult?.customerAccessToken?.accessToken;
    const expiresAt = loginResult?.customerAccessToken?.expiresAt;

    if (accessToken) {
      (await cookies()).set('customerAccessToken', accessToken, {
        expires: new Date(expiresAt),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });
    }
  } catch (e) {
    return { error: "Une erreur est survenue lors de l'inscription." };
  }

  redirect('/account?welcome=true');
}

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const result = await createCustomerAccessToken({
      email,
      password,
    });

    if (result?.customerUserErrors?.length > 0) {
      return { error: result.customerUserErrors[0].message };
    }

    const accessToken = result?.customerAccessToken?.accessToken;
    const expiresAt = result?.customerAccessToken?.expiresAt;

    if (accessToken) {
      (await cookies()).set('customerAccessToken', accessToken, {
        expires: new Date(expiresAt),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });
    }
  } catch (e) {
    return { error: "Une erreur est survenue lors de la connexion." };
  }

  redirect('/account');
}

export async function logout() {
  (await cookies()).delete('customerAccessToken');
  redirect('/login');
}

export async function getSession() {
  const accessToken = (await cookies()).get('customerAccessToken')?.value;
  if (!accessToken) return null;

  try {
    const customer = await getCustomer(accessToken);
    return customer;
  } catch (error) {
    return null;
  }
}
