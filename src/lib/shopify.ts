// ============================================================
// SHOPIFY CONFIG
// ============================================================

const SHOPIFY_STORE_DOMAIN =
  process.env.SHOPIFY_STORE_DOMAIN;

const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const SHOPIFY_ADMIN_ACCESS_TOKEN =
  process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

const SHOPIFY_API_VERSION = '2024-04';


// ============================================================
// VALIDATION
// ============================================================

if (!SHOPIFY_STORE_DOMAIN) {
  console.warn(
    '⚠️ SHOPIFY_STORE_DOMAIN is missing'
  );
}

if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
  console.warn(
    '⚠️ SHOPIFY_STOREFRONT_ACCESS_TOKEN is missing'
  );
}


// ============================================================
// HELPERS
// ============================================================

function getStoreDomain() {
  return SHOPIFY_STORE_DOMAIN?.replace(
    /^https?:\/\//,
    ''
  ).replace(/\/$/,
    ''
  );
}


// ============================================================
// STOREFRONT FETCH
// ============================================================

export const shopifyFetch = async ({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, any>;
}) => {
  const domain = getStoreDomain();

  if (!domain) {
    return {
      status: 500,
      body: {
        errors: [
          {
            message:
              'SHOPIFY_STORE_DOMAIN is missing',
          },
        ],
      },
    };
  }

  if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    return {
      status: 500,
      body: {
        errors: [
          {
            message:
              'SHOPIFY_STOREFRONT_ACCESS_TOKEN is missing',
          },
        ],
      },
    };
  }

  const endpoint =
    `https://${domain}/api/${SHOPIFY_API_VERSION}/graphql.json`;

  try {
    const response = await fetch(
      endpoint,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',

          'X-Shopify-Storefront-Access-Token':
            SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        },

        body: JSON.stringify({
          query,
          variables,
        }),

        cache: 'no-store',
      }
    );

    const body =
      await response.json();

    if (!response.ok) {
      console.error(
        '❌ Shopify Storefront HTTP Error:',
        response.status,
        body
      );
    }

    if (body?.errors) {
      console.error(
        '❌ Shopify Storefront GraphQL Errors:',
        JSON.stringify(
          body.errors,
          null,
          2
        )
      );
    }

    return {
      status: response.status,
      body,
    };
  } catch (error) {
    console.error(
      '❌ Shopify Storefront Fetch Error:',
      error
    );

    return {
      status: 500,
      body: {
        errors: [
          {
            message:
              error instanceof Error
                ? error.message
                : 'Unknown error',
          },
        ],
      },
    };
  }
};


// ============================================================
// ADMIN FETCH
// ============================================================

export const adminFetch = async ({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, any>;
}) => {
  const domain = getStoreDomain();

  if (!domain) {
    return {
      status: 500,
      body: {
        errors: [
          {
            message:
              'SHOPIFY_STORE_DOMAIN is missing',
          },
        ],
      },
    };
  }

  if (!SHOPIFY_ADMIN_ACCESS_TOKEN) {
    return {
      status: 500,
      body: {
        errors: [
          {
            message:
              'SHOPIFY_ADMIN_ACCESS_TOKEN is missing',
          },
        ],
      },
    };
  }

  const endpoint =
    `https://${domain}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;

  try {
    const response = await fetch(
      endpoint,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',

          'X-Shopify-Access-Token':
            SHOPIFY_ADMIN_ACCESS_TOKEN,
        },

        body: JSON.stringify({
          query,
          variables,
        }),

        cache: 'no-store',
      }
    );

    const body =
      await response.json();

    if (!response.ok) {
      console.error(
        '❌ Shopify Admin HTTP Error:',
        response.status,
        body
      );
    }

    if (body?.errors) {
      console.error(
        '❌ Shopify Admin GraphQL Errors:',
        JSON.stringify(
          body.errors,
          null,
          2
        )
      );
    }

    return {
      status: response.status,
      body,
    };
  } catch (error) {
    console.error(
      '❌ Shopify Admin Fetch Error:',
      error
    );

    return {
      status: 500,
      body: {
        errors: [
          {
            message:
              error instanceof Error
                ? error.message
                : 'Unknown error',
          },
        ],
      },
    };
  }
};


// ============================================================
// PRODUCTS
// ============================================================

export const getProducts = async () => {
  const query = `
    query getProducts {
      products(
        first: 50
        sortKey: CREATED
        reverse: true
      ) {
        edges {
          node {
            id
            title
            handle
            description
            productType

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

            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }

              maxVariantPrice {
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
          }
        }
      }
    }
  `;

  const res =
    await shopifyFetch({
      query,
    });

  return (
    res.body?.data?.products?.edges ||
    []
  );
};


// ============================================================
// SINGLE PRODUCT
// ============================================================

export const getProduct = async (
  handle: string
) => {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
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

          maxVariantPrice {
            amount
            currencyCode
          }
        }

        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode
          }

          maxVariantPrice {
            amount
            currencyCode
          }
        }

        images(first: 20) {
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

  const res =
    await shopifyFetch({
      query,
      variables: {
        handle,
      },
    });

  return (
    res.body?.data?.product ||
    null
  );
};


// ============================================================
// COLLECTION PRODUCTS
// ============================================================

export const getCollectionProducts = async (
  handle: string
) => {
  const query = `
    query getCollectionProducts(
      $handle: String!
    ) {
      collection(handle: $handle) {
        id
        title
        handle
        description

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

                maxVariantPrice {
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
                    availableForSale

                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const res =
    await shopifyFetch({
      query,
      variables: {
        handle,
      },
    });

  return (
    res.body?.data?.collection ||
    null
  );
};


// ============================================================
// COLLECTIONS
// ============================================================

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

  const res =
    await shopifyFetch({
      query,
    });

  return (
    res.body?.data?.collections?.edges ||
    []
  );
};


// ============================================================
// ALL PRODUCTS
// ============================================================

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

              maxVariantPrice {
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
                }
              }
            }
          }
        }
      }
    }
  `;

  const res =
    await shopifyFetch({
      query,
    });

  return (
    res.body?.data?.products?.edges ||
    []
  );
};


// ============================================================
// CREATE COD ORDER
// ============================================================

export const createCodOrder = async (
  orderData: any
) => {
  const {
    firstName,
    lastName,
    phone,
    city,
    address,
    email: providedEmail,
    items,
  } = orderData;

  const sanitizedPhone =
    String(phone || '')
      .replace(/\s/g, '');

  const email =
    providedEmail &&
    String(providedEmail).trim() !== ''
      ? String(providedEmail).trim()
      : null;

  if (!firstName || !lastName) {
    return {
      draftOrder: null,
      userErrors: [
        {
          message:
            'Prénom et nom obligatoires',
        },
      ],
    };
  }

  if (!sanitizedPhone) {
    return {
      draftOrder: null,
      userErrors: [
        {
          message:
            'Téléphone obligatoire',
        },
      ],
    };
  }

  if (
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return {
      draftOrder: null,
      userErrors: [
        {
          message:
            'Le panier est vide',
        },
      ],
    };
  }

  // ----------------------------------------------------------
  // CUSTOMER
  // ----------------------------------------------------------

  let customerId = null;

  const searchQuery = email
    ? `phone:${sanitizedPhone} OR email:${email}`
    : `phone:${sanitizedPhone}`;

  const searchRes =
    await adminFetch({
      query: `
        query SearchCustomer(
          $query: String!
        ) {
          customers(
            first: 1
            query: $query
          ) {
            edges {
              node {
                id
              }
            }
          }
        }
      `,
      variables: {
        query: searchQuery,
      },
    });

  if (
    searchRes.body?.data?.customers
      ?.edges?.length > 0
  ) {
    customerId =
      searchRes.body.data.customers
        .edges[0].node.id;
  } else {
    const customerInput: any = {
      firstName,
      lastName,

      phone:
        sanitizedPhone.startsWith('+')
          ? sanitizedPhone
          : `+212${sanitizedPhone.replace(
              /^0/,
              ''
            )}`,

      addresses: [
        {
          firstName,
          lastName,
          address1: address,
          city,
          countryCode: 'MA',
          phone: sanitizedPhone,
        },
      ],
    };

    if (email) {
      customerInput.email = email;
    }

    const customerRes =
      await adminFetch({
        query: `
          mutation customerCreate(
            $input: CustomerInput!
          ) {
            customerCreate(
              input: $input
            ) {
              customer {
                id
              }

              userErrors {
                field
                message
              }
            }
          }
        `,

        variables: {
          input: customerInput,
        },
      });

    customerId =
      customerRes.body?.data
        ?.customerCreate
        ?.customer
        ?.id;

    if (!customerId) {
      return {
        draftOrder: null,
        userErrors:
          customerRes.body?.data
            ?.customerCreate
            ?.userErrors ||
          [
            {
              message:
                'Impossible de créer le client Shopify',
            },
          ],
      };
    }
  }

  // ----------------------------------------------------------
  // LINE ITEMS
  // ----------------------------------------------------------

  const lineItems = items
    .map((item: any) => ({
      variantId: item.variantId,
      quantity: Number(
        item.quantity || 1
      ),
    }))
    .filter(
      (item: any) =>
        item.variantId &&
        item.quantity > 0
    );

  if (lineItems.length === 0) {
    return {
      draftOrder: null,
      userErrors: [
        {
          message:
            'Aucun article valide dans le panier',
        },
      ],
    };
  }

  // ----------------------------------------------------------
  // ADDRESS
  // ----------------------------------------------------------

  const addressInput = {
    firstName,
    lastName,
    phone: sanitizedPhone,
    city,
    address1: address,
    countryCode: 'MA',
    zip: '00000',
  };

  // ----------------------------------------------------------
  // DRAFT ORDER
  // ----------------------------------------------------------

  const draftOrderInput: any = {
    customerId,

    note:
      `COMMANDE COD - Tél: ${phone} - ${firstName} ${lastName}`,

    shippingAddress:
      addressInput,

    billingAddress:
      addressInput,

    lineItems,

    shippingLine: {
      title: 'Livraison Gratuite',
      price: 0,
    },

    customAttributes: [
      {
        key: 'Payment Method',
        value: 'COD',
      },
      {
        key: 'Customer Phone',
        value: String(phone),
      },
    ],
  };

  if (email) {
    draftOrderInput.email = email;
  }

  const createRes =
    await adminFetch({
      query: `
        mutation draftOrderCreate(
          $input: DraftOrderInput!
        ) {
          draftOrderCreate(
            input: $input
          ) {
            draftOrder {
              id
            }

            userErrors {
              field
              message
            }
          }
        }
      `,

      variables: {
        input: draftOrderInput,
      },
    });

  const draftOrder =
    createRes.body?.data
      ?.draftOrderCreate
      ?.draftOrder;

  if (!draftOrder?.id) {
    return {
      draftOrder: null,
      userErrors:
        createRes.body?.data
          ?.draftOrderCreate
          ?.userErrors ||
        [
          {
            message:
              'Impossible de créer la commande',
          },
        ],
    };
  }

  // ----------------------------------------------------------
  // COMPLETE
  // ----------------------------------------------------------

  const completeRes =
    await adminFetch({
      query: `
        mutation draftOrderComplete(
          $id: ID!
          $paymentPending: Boolean
        ) {
          draftOrderComplete(
            id: $id
            paymentPending: $paymentPending
          ) {
            draftOrder {
              id

              order {
                id
                name
                displayFinancialStatus
              }
            }

            userErrors {
              field
              message
            }
          }
        }
      `,

      variables: {
        id: draftOrder.id,
        paymentPending: true,
      },
    });

  return {
    draftOrder:
      completeRes.body?.data
        ?.draftOrderComplete
        ?.draftOrder ||
      null,

    userErrors:
      completeRes.body?.data
        ?.draftOrderComplete
        ?.userErrors ||
      [],
  };
};


// ============================================================
// CUSTOMER CREATE
// ============================================================

export const createCustomer = async (
  input: any
) => {
  const mutation = `
    mutation customerCreate(
      $input: CustomerCreateInput!
    ) {
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

  const res =
    await shopifyFetch({
      query: mutation,
      variables: {
        input,
      },
    });

  return (
    res.body?.data?.customerCreate ||
    null
  );
};


// ============================================================
// CUSTOMER LOGIN
// ============================================================

export const createCustomerAccessToken =
  async (
    input: any
  ) => {
    const mutation = `
      mutation customerAccessTokenCreate(
        $input: CustomerAccessTokenCreateInput!
      ) {
        customerAccessTokenCreate(
          input: $input
        ) {
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

    const res =
      await shopifyFetch({
        query: mutation,
        variables: {
          input,
        },
      });

    return (
      res.body?.data
        ?.customerAccessTokenCreate ||
      null
    );
  };


// ============================================================
// CUSTOMER
// ============================================================

export const getCustomer = async (
  accessToken: string
) => {
  const query = `
    query getCustomer(
      $customerAccessToken: String!
    ) {
      customer(
        customerAccessToken: $customerAccessToken
      ) {
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

  const res =
    await shopifyFetch({
      query,
      variables: {
        customerAccessToken:
          accessToken,
      },
    });

  return (
    res.body?.data?.customer ||
    null
  );
};


// ============================================================
// ADMIN CUSTOMERS
// ============================================================

export const getAllCustomers =
  async () => {
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

    const res =
      await adminFetch({
        query,
      });

    return (
      res.body?.data
        ?.customers?.edges ||
      []
    );
  };