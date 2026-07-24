export const shopifyFetch = async ({ query, variables = {} }: { query: string, variables?: any }) => {
  const endpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-04/graphql.json`;
  const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key!,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 0 }
    });

    const body = await result.json();
    if (body.errors) {
      console.error('Shopify API Errors:', JSON.stringify(body.errors, null, 2));
    }

    return {
      status: result.status,
      body: body
    };
  } catch (e) {
    console.error('Error fetching from Shopify:', e);
    return {
      status: 500,
      body: (e as Error).message
    };
  }
};

export const adminFetch = async ({ query, variables = {} }: { query: string, variables?: any }) => {
  const endpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-04/graphql.json`;
  const key = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': key!,
      },
      body: JSON.stringify({ query, variables }),
    });

    const body = await result.json();
    if (body.errors) {
      console.error('Shopify Admin API Errors:', JSON.stringify(body.errors, null, 2));
    }
    return {
      status: result.status,
      body: body
    };
  } catch (e) {
    console.error('Error fetching from Shopify Admin:', e);
    return {
      status: 500,
      body: (e as Error).message
    };
  }
};

  export const getProducts = async () => {
    const query = `
      query getProducts {
        products(
  first: 10
  sortKey: CREATED
  reverse: true
)  {
          edges {
            node {
              id
              title
              handle
              description
              options {
                name
                values
              }
              variants(first: 100) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    `;

    const res = await shopifyFetch({ query });
    return res.body?.data?.products?.edges || [];
  };


export const getProduct = async (handle: string) => {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        description
        descriptionHtml
        options {
          name
          values
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              availableForSale
              selectedOptions {
                name
                value
              }
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const res = await shopifyFetch({ query, variables: { handle } });
  return res.body?.data?.product;
};

  export const getCollectionProducts = async (handle: string) => {
    const query = `
      query getCollectionProducts($handle: String!) {
        collection(handle: $handle) {
          title
         products(
  first: 250
  sortKey: CREATED
  reverse: true
) {
            edges {
              node {
                id
                title
                handle
                options {
                  name
                  values
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const res = await shopifyFetch({ query, variables: { handle } });
    return res.body?.data?.collection;
  };

  export const getCollections = async () => {
    const query = `
      query getCollections {
        collections(first: 50) {
          edges {
            node {
              id
              title
              handle
              description
              image {
                url
                altText
              }
            }
          }
        }
      }
    `;

    const res = await shopifyFetch({ query });
    return res.body?.data?.collections?.edges || [];
  };

    export const getAllProducts = async () => {
      const query = `
        query getAllProducts {
         products(
  first: 250
  sortKey: CREATED
  reverse: true
) {
            edges {
              node {
                id
                title
                handle
                productType
                options {
                  name
                  values
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const res = await shopifyFetch({ query });
      return res.body?.data?.products?.edges || [];
    };



export const createCodOrder = async (orderData: any) => {
  const { firstName, lastName, phone, city, address, email: providedEmail, items } = orderData;
  const sanitizedPhone = phone.replace(/\s/g, '');
  const email = providedEmail && providedEmail.trim() !== '' ? providedEmail : null;

  // 1. Find or Create Customer
  let customerId = null;
  const searchQuery = email 
    ? `phone:${sanitizedPhone} OR email:${email}`
    : `phone:${sanitizedPhone}`;

  const searchRes = await adminFetch({
    query: `query { customers(first: 1, query: "${searchQuery}") { edges { node { id } } } }`
  });
  
  if (searchRes.body?.data?.customers?.edges?.length > 0) {
    customerId = searchRes.body.data.customers.edges[0].node.id;
  } else {
    const customerMutation = `
      mutation customerCreate($input: CustomerInput!) {
        customerCreate(input: $input) {
          customer { id }
          userErrors { field message }
        }
      }
    `;
    const customerInput: any = {
      firstName,
      lastName,
      phone: sanitizedPhone.startsWith('+') ? sanitizedPhone : `+212${sanitizedPhone.replace(/^0/, '')}`,
      addresses: [{
        firstName,
        lastName,
        address1: address,
        city,
        countryCode: "MA",
        phone: sanitizedPhone
      }]
    };

    if (email) {
      customerInput.email = email;
    }

    const customerRes = await adminFetch({ 
      query: customerMutation, 
      variables: { input: customerInput } 
    });
    customerId = customerRes.body?.data?.customerCreate?.customer?.id;
  }

  // 2. Create Draft Order with explicit addresses
  const lineItems = items.map((item: any) => ({
    variantId: item.variantId,
    quantity: item.quantity,
  }));

  const addressInput = {
    firstName,
    lastName,
    phone: sanitizedPhone,
    city,
    address1: address,
    countryCode: "MA",
    zip: "00000"
  };

  const createMutation = `
    mutation draftOrderCreate($input: DraftOrderInput!) {
      draftOrderCreate(input: $input) {
        draftOrder { id }
        userErrors { field message }
      }
    }
  `;

  const draftOrderInput: any = {
    customerId,
    note: `COMMANDE COD - Tél: ${phone} - ${firstName} ${lastName}`,
    shippingAddress: addressInput,
    billingAddress: addressInput,
    lineItems,
    shippingLine: { title: "Livraison Gratuite", price: 0 },
    customAttributes: [
      { key: "Payment Method", value: "COD" },
      { key: "Customer Phone", value: phone }
    ]
  };

  if (email) {
    draftOrderInput.email = email;
  }

  const createRes = await adminFetch({ 
    query: createMutation, 
    variables: { input: draftOrderInput } 
  });
  const draftOrderId = createRes.body?.data?.draftOrderCreate?.draftOrder?.id;
  
  if (!draftOrderId) {
    return { draftOrder: null, userErrors: createRes.body?.data?.draftOrderCreate?.userErrors || [] };
  }

  // 3. Complete Draft Order and force PENDING status
  const completeMutation = `
    mutation draftOrderComplete($id: ID!, $paymentPending: Boolean) {
      draftOrderComplete(id: $id, paymentPending: $paymentPending) {
        draftOrder {
          id
          order {
            id
            name
            displayFinancialStatus
          }
        }
        userErrors { field message }
      }
    }
  `;

  const completeRes = await adminFetch({ 
    query: completeMutation, 
    variables: { id: draftOrderId, paymentPending: true } 
  });

  return {
    draftOrder: completeRes.body?.data?.draftOrderComplete?.draftOrder,
    userErrors: completeRes.body?.data?.draftOrderComplete?.userErrors || []
  };
};

export const createCustomer = async (input: any) => {
  const mutation = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
          firstName
          lastName
        }
        customerUserErrors {
          field
          message
          code
        }
      }
    }
  `;

  const res = await shopifyFetch({ query: mutation, variables: { input } });
  return res.body?.data?.customerCreate;
};

export const createCustomerAccessToken = async (input: any) => {
  const mutation = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          field
          message
          code
        }
      }
    }
  `;

  const res = await shopifyFetch({ query: mutation, variables: { input } });
  return res.body?.data?.customerAccessTokenCreate;
};

export const getCustomer = async (accessToken: string) => {
  const query = `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        email
        phone
        orders(first: 10) {
          edges {
            node {
              id
              orderNumber
              processedAt
              totalPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const res = await shopifyFetch({ query, variables: { customerAccessToken: accessToken } });
  return res.body?.data?.customer;
};

export const getAllCustomers = async () => {
  const query = `
    query getAllCustomers {
      customers(first: 50) {
        edges {
          node {
            id
            firstName
            lastName
            email
            phone
            ordersCount
            totalSpent
          }
        }
      }
    }
  `;

  const res = await adminFetch({ query });
  return res.body?.data?.customers?.edges || [];
};
