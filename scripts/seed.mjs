const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const galleriesCollectionId = process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID;
const reviewsCollectionId = process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID;
const agentsCollectionId = process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID;
const propertiesCollectionId = process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID;

if (!endpoint || !projectId || !databaseId) {
  console.error("Missing Appwrite env variables. Check .env.local");
  process.exit(1);
}

const headers = {
  "X-Appwrite-Project": projectId,
  "Content-Type": "application/json",
};
if (process.env.APPWRITE_API_KEY) {
  headers["X-Appwrite-Key"] = process.env.APPWRITE_API_KEY;
}

async function listDocuments(collectionId) {
  const res = await fetch(
    `${endpoint}/databases/${databaseId}/collections/${collectionId}/documents?queries[]=${encodeURIComponent(
      '{"method":"limit","values":[5000]}'
    )}`,
    { headers }
  );
  if (!res.ok) throw new Error(`listDocuments ${res.status}: ${await res.text()}`);
  return (await res.json()).documents;
}

async function deleteDocument(collectionId, documentId) {
  const res = await fetch(
    `${endpoint}/databases/${databaseId}/collections/${collectionId}/documents/${documentId}`,
    { method: "DELETE", headers }
  );
  if (!res.ok) throw new Error(`deleteDocument ${res.status}: ${await res.text()}`);
}

async function createDocument(collectionId, data) {
  const res = await fetch(
    `${endpoint}/databases/${databaseId}/collections/${collectionId}/documents`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ documentId: "unique()", data }),
    }
  );
  if (!res.ok) throw new Error(`createDocument ${res.status}: ${await res.text()}`);
  return res.json();
}

const galleryImages = [
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1638799869566-b17fa794c4de?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1638799869566-b17fa794c4de?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1560185009-dddeb820c7b7?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1641910532059-ad684fd3049c?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1621293954908-907159247fc8?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1604328702728-d26d2062c20b?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1600435335786-d74d2bb6de37?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1635108198979-9806fdf275c6?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const agentImages = [
  "https://images.unsplash.com/photo-1691335053879-02096d6ee2ca?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1544723495-432537d12f6c?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1542507464418-09c375b86bbe?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const reviewImages = [
  "https://images.unsplash.com/photo-1517331671191-ddc2c6d3ebd1?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1474176857210-7287d38d27c6?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1511551203524-9a24350a5771?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const propertiesImages = [
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1605146768851-eda79da39897?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1561753757-d8880c5a3551?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1551241090-67de81d3541c?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1697299262049-e9b5fa1e9761?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1719299225324-301bad5c333c?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1516095901529-0ef7be431a4f?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1600585153490-76fb20a32601?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1720432972486-2d53db5badf0?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const propertyTypes = [
  "House",
  "Townhomes",
  "Condos",
  "Duplexes",
  "Studios",
  "Villa",
  "Apartments",
  "Others",
];

const facilities = [
  "Laundry",
  "Car Parking",
  "Sports Center",
  "Cutlery",
  "Gym",
  "Swimming pool",
  "Wifi",
  "Pet Center",
];

function getRandomSubset(array, minItems, maxItems) {
  const subsetSize =
    Math.floor(Math.random() * (maxItems - minItems + 1)) + minItems;
  const arrayCopy = [...array];
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[i],
    ];
  }
  return arrayCopy.slice(0, subsetSize);
}

const COLLECTIONS = {
  AGENT: agentsCollectionId,
  REVIEWS: reviewsCollectionId,
  GALLERY: galleriesCollectionId,
  PROPERTY: propertiesCollectionId,
};

async function api(path, options = {}) {
  const res = await fetch(`${endpoint}${path}`, {
    ...options,
    headers: { ...headers, ...(options.headers || {}) },
  });
  const body = await res.text();
  let json = null;
  try {
    json = JSON.parse(body);
  } catch {
    /* ignore */
  }
  return { res, json, body };
}

async function createAttribute(collectionId, kind, payload) {
  const { res, json } = await api(
    `/databases/${databaseId}/collections/${collectionId}/attributes/${kind}`,
    { method: "POST", body: JSON.stringify({ ...payload, required: true }) }
  );
  if (!res.ok && !/exist|already/.test(JSON.stringify(json))) {
    throw new Error(`createAttribute ${res.status}: ${JSON.stringify(json)}`);
  }
}

async function deleteAttribute(collectionId, key) {
  const { res } = await api(
    `/databases/${databaseId}/collections/${collectionId}/attributes/${key}`,
    { method: "DELETE" }
  );
  if (!res.ok && res.status !== 404) {
    throw new Error(`deleteAttribute ${res.status}: ${await res.text()}`);
  }
}

async function waitForAttribute(collectionId, key, active = true) {
  for (let i = 0; i < 30; i++) {
    const { res, json } = await api(
      `/databases/${databaseId}/collections/${collectionId}/attributes`,
      { method: "GET" }
    );
    if (!res.ok) throw new Error(`getAttributes ${res.status}: ${JSON.stringify(json)}`);
    const found = (json.attributes || []).some(
      (attr) => attr.key === key && attr.status === (active ? "available" : "deleting")
    );
    if (active && found) return;
    if (!active && !(json.attributes || []).some((attr) => attr.key === key)) return;
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`Timed out waiting for attribute ${key} to ${active ? "be available" : "be deleted"}`);
}

async function ensureIndexableAttributes(collectionId, keys) {
  const { res, json } = await api(
    `/databases/${databaseId}/collections/${collectionId}/attributes`,
    { method: "GET" }
  );
  if (!res.ok) throw new Error(`getAttributes ${res.status}: ${JSON.stringify(json)}`);
  for (const key of keys) {
    const attribute = (json.attributes || []).find((attr) => attr.key === key);
    if (attribute && attribute.status === "available" && attribute.size > 767) {
      await deleteAttribute(collectionId, key);
      await waitForAttribute(collectionId, key, false);
      console.log(`Removed oversized attribute: ${key}`);
    }
  }
}

async function ensureSchema() {
  const clientReadPermissions = ["read(\"users\")"];

  for (const collectionId of Object.values(COLLECTIONS)) {
    const { res, json } = await api(
      `/databases/${databaseId}/collections/${collectionId}`,
      {
        method: "PUT",
        body: JSON.stringify({ permissions: clientReadPermissions }),
      }
    );
    if (!res.ok) {
      throw new Error(
        `updateCollectionPermissions ${res.status}: ${JSON.stringify(json)}`
      );
    }
  }

  const string = (key, size = 256, array = false) => ({ key, size, array });
  const integer = (key) => ({ key });
  const stringArray = (key) => ({ key, size: 256, array: true });

  for (const key of ["name", "email", "avatar"]) {
    await createAttribute(COLLECTIONS.AGENT, "string", string(key));
  }

  for (const key of ["name", "avatar", "review"]) {
    await createAttribute(COLLECTIONS.REVIEWS, "string", string(key));
  }
  await createAttribute(COLLECTIONS.REVIEWS, "integer", integer("rating"));

  await createAttribute(COLLECTIONS.GALLERY, "string", string("image"));

  await ensureIndexableAttributes(COLLECTIONS.PROPERTY, ["name", "type", "address"]);

  for (const key of ["name", "type", "address"]) {
    await createAttribute(COLLECTIONS.PROPERTY, "string", string(key, 256));
  }
  for (const key of ["description", "geolocation", "image"]) {
    await createAttribute(COLLECTIONS.PROPERTY, "string", string(key, 1024));
  }
  for (const key of ["price", "area", "bedrooms", "bathrooms", "rating"]) {
    await createAttribute(COLLECTIONS.PROPERTY, "integer", integer(key));
  }
  await createAttribute(COLLECTIONS.PROPERTY, "string", stringArray("facilities"));

  const relations = [
    { key: "agent", relatedCollectionId: agentsCollectionId, type: "manyToOne" },
    { key: "reviews", relatedCollectionId: reviewsCollectionId, type: "manyToMany" },
    { key: "gallery", relatedCollectionId: galleriesCollectionId, type: "manyToMany" },
  ];
  for (const rel of relations) {
    const { res, json } = await api(
      `/databases/${databaseId}/collections/${COLLECTIONS.PROPERTY}/attributes/relationship`,
      {
        method: "POST",
        body: JSON.stringify({
          relatedCollectionId: rel.relatedCollectionId,
          type: rel.type,
          twoWay: false,
          key: rel.key,
          onDelete: "cascade",
        }),
      }
    );
    if (!res.ok && !/exist|already/.test(JSON.stringify(json))) {
      throw new Error(`createRelationship ${res.status}: ${JSON.stringify(json)}`);
    }
  }

  const indexes = [
    { key: "type_idx", type: "key", attributes: ["type"], orders: ["ASC"] },
    { key: "name_search_idx", type: "fulltext", attributes: ["name"], orders: ["ASC"] },
    { key: "address_search_idx", type: "fulltext", attributes: ["address"], orders: ["ASC"] },
    { key: "type_search_idx", type: "fulltext", attributes: ["type"], orders: ["ASC"] },
  ];
  for (const idx of indexes) {
    const { res, json } = await api(
      `/databases/${databaseId}/collections/${COLLECTIONS.PROPERTY}/indexes`,
      { method: "POST", body: JSON.stringify(idx) }
    );
    if (!res.ok && !/exist|already/.test(JSON.stringify(json))) {
      throw new Error(`createIndex ${res.status}: ${JSON.stringify(json)}`);
    }
  }

  console.log("Schema ensured.");
}

async function seed() {
  try {
    await ensureSchema();

    for (const key in COLLECTIONS) {
      const collectionId = COLLECTIONS[key];
      const documents = await listDocuments(collectionId);
      for (const doc of documents) {
        await deleteDocument(collectionId, doc.$id);
      }
    }
    console.log("Cleared all existing data.");

    const agents = [];
    for (let i = 1; i <= 5; i++) {
      const agent = await createDocument(COLLECTIONS.AGENT, {
        name: `Agent ${i}`,
        email: `agent${i}@example.com`,
        avatar: agentImages[Math.floor(Math.random() * agentImages.length)],
      });
      agents.push(agent);
    }
    console.log(`Seeded ${agents.length} agents.`);

    const reviews = [];
    for (let i = 1; i <= 20; i++) {
      const review = await createDocument(COLLECTIONS.REVIEWS, {
        name: `Reviewer ${i}`,
        avatar: reviewImages[Math.floor(Math.random() * reviewImages.length)],
        review: `This is a review by Reviewer ${i}.`,
        rating: Math.floor(Math.random() * 5) + 1,
      });
      reviews.push(review);
    }
    console.log(`Seeded ${reviews.length} reviews.`);

    const galleries = [];
    for (const image of galleryImages) {
      const gallery = await createDocument(COLLECTIONS.GALLERY, { image });
      galleries.push(gallery);
    }
    console.log(`Seeded ${galleries.length} galleries.`);

    for (let i = 1; i <= 20; i++) {
      const assignedAgent = agents[Math.floor(Math.random() * agents.length)];
      const assignedReviews = getRandomSubset(reviews, 5, 7);
      const assignedGalleries = getRandomSubset(galleries, 3, 8);
      const selectedFacilities = facilities
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * facilities.length) + 1);
      const image =
        propertiesImages.length - 1 >= i
          ? propertiesImages[i]
          : propertiesImages[Math.floor(Math.random() * propertiesImages.length)];

      await createDocument(COLLECTIONS.PROPERTY, {
        name: `Property ${i}`,
        type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
        description: `This is the description for Property ${i}.`,
        address: `123 Property Street, City ${i}`,
        geolocation: `192.168.1.${i}, 192.168.1.${i}`,
        price: Math.floor(Math.random() * 9000) + 1000,
        area: Math.floor(Math.random() * 3000) + 500,
        bedrooms: Math.floor(Math.random() * 5) + 1,
        bathrooms: Math.floor(Math.random() * 5) + 1,
        rating: Math.floor(Math.random() * 5) + 1,
        facilities: selectedFacilities,
        image,
        agent: assignedAgent.$id,
        reviews: assignedReviews.map((review) => review.$id),
        gallery: assignedGalleries.map((gallery) => gallery.$id),
      });

      console.log(`Seeded property: Property ${i}`);
    }

    console.log("Data seeding completed.");
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

seed();