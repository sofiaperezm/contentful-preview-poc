const POST_GRAPHQL_FIELDS = `
  sys {
    id
  }
  __typename
  slug
  entryName
  title
  coverImage {
    url
  }
  date
  author {
    name
    picture {
      url
    }
  }
  excerpt
  content {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
`;

const PRODUCT_GRAPHQL_FIELDS = `
  sys {
    id
  }
  __typename
  internalName
  title
  slug
  category
  description {
    json
  }
  price
  image {
    url
  }
`;

const RESTAURANT_GRAPHQL_FIELDS = `
  sys {
    id
  }
  __typename
  entryName
  name
  slug
  address {
    lat
    lon
  }
  phoneNumber
  image {
    url
  }
`;

async function fetchGraphQL(query: string, preview = false): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_SOURCE_ENVIRONMENT_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ["posts"] },
    },
  ).then((response) => response.json());
}

function extractPost(fetchResponse: any): any {
  return fetchResponse?.data?.postCollection?.items?.[0];
}

function extractPostEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.postCollection?.items;
}

export async function getPreviewPostBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true,
  );
  return extractPost(entry);
}

export async function getAllPosts(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, order: date_DESC, preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode,
  );
  console.log("entries", entries);
  return extractPostEntries(entries);
}

export async function getPostAndMorePosts(
  slug: string,
  preview: boolean,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
        preview ? "true" : "false"
      }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
        preview ? "true" : "false"
      }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  };
}

export async function getAllProducts(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      productCollection(where: { slug_exists: true }, order: internalName_ASC, preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          ${PRODUCT_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode,
  );
  return entries?.data?.productCollection?.items;
}

export async function getProductBySlug(slug: string, isDraftMode: boolean): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      productCollection(where: { slug: "${slug}" }, preview: ${
      isDraftMode ? "true" : "false"
    }, limit: 1) {
        items {
          ${PRODUCT_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode
  );
  return entry?.data?.productCollection?.items?.[0];
}

export async function getAllRestaurants(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      restaurantCollection(where: { slug_exists: true }, order: entryName_ASC, preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          ${RESTAURANT_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode,
  );
  console.log("entries", entries);
  return entries?.data?.restaurantCollection?.items;
}

export async function getRestaurantBySlug(slug: string, isDraftMode: boolean): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      restaurantCollection(where: { slug: "${slug}" }, preview: ${
      isDraftMode ? "true" : "false"
    }, limit: 1) {
        items {
          ${RESTAURANT_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode
  );
  return entry?.data?.restaurantCollection?.items?.[0];
}
