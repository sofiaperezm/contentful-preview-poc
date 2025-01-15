import { ContentType } from '../types'

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

function getTypeMappings(type: ContentType) {
  const typeMappings = {
    post: {
      collection: "postCollection",
      fields: POST_GRAPHQL_FIELDS,
      order: 'date_DESC',
    },
    restaurant: {
      collection: "restaurantCollection",
      fields: RESTAURANT_GRAPHQL_FIELDS,
      order: 'name_DESC',
    }
  };
  
  if (!typeMappings[type]) {
    throw new Error(`Invalid type: ${type}`);
  }

  return typeMappings[type];
}

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

function extractSingleEntry(fetchResponse: any, collection: any): any {
  return fetchResponse?.data?.[collection]?.items?.[0];
}

function extractAllEntries(fetchResponse: any, collection: any): any {
  return fetchResponse?.data?.[collection]?.items;
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
    post: extractSingleEntry(entry, 'postCollection'),
    morePosts: extractAllEntries(entries, 'postCollection'),
  };
}

export async function getContentBySlug(slug: string, isDraftMode: boolean, type: ContentType): Promise<any> {
  const { collection, fields } = getTypeMappings(type);

  const query = `
  query {
    ${collection}(where: { slug: "${slug}" }, preview: ${isDraftMode ? "true" : "false"}, limit: 1) {
      items {
        ${fields}
      }
    }
  }
`;

  const entry = await fetchGraphQL(query, isDraftMode);
  return extractSingleEntry(entry, collection);
}

export async function getAllContent(isDraftMode: boolean, type: ContentType): Promise<any> {
  const { collection, fields, order } = getTypeMappings(type);

  const query = `query {
    ${collection}(where: { slug_exists: true }, order: ${order}, preview: ${
      isDraftMode ? "true" : "false"
    }) {
      items {
        ${fields}
      }
    }
  }`;

  const entries = await fetchGraphQL(query, isDraftMode);
  return extractAllEntries(entries, collection);
}
