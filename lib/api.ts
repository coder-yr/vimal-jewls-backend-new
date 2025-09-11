// lib/api.ts
// Fetch all products from backend API
export async function fetchProducts() {
  const res = await fetch("http://localhost:7502/api/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return await res.json();
}

// Fetch a product by ID from backend API
export async function fetchProductById(id: string) {
  const res = await fetch(`http://localhost:7502/api/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return await res.json();
}

// Fetch all categories from backend API
export async function fetchCategories() {
  const res = await fetch("http://localhost:7502/api/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return await res.json();
}

// Fetch all collections from backend API
export async function fetchCollections() {
  const res = await fetch("http://localhost:7502/api/collections");
  if (!res.ok) throw new Error("Failed to fetch collections");
  return await res.json();
}

// Fetch a product by slug from backend API
export async function fetchProductBySlug(slug: string | undefined): Promise<any> {
  try {
    if (!slug || slug === 'undefined') {
      console.error('Invalid slug provided:', slug);
      return null;
    }

    const res = await fetch(`http://localhost:7502/api/products/slug/${encodeURIComponent(slug)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!res.ok) {
      if (res.status === 404) {
        console.log(`Product not found with slug: ${slug}`);
        return null;
      }
      const errorData = await res.json();
      throw new Error(errorData.message || `Failed to fetch product with slug: ${slug}`);
    }

    const data = await res.json();
    if (!data || Object.keys(data).length === 0) {
      console.log(`No data received for slug: ${slug}`);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function signupUser(data: { username: string; email: string; password: string }) {
  const res = await fetch("http://localhost:7502/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function signinUser(data: { email: string; password: string }) {
  const res = await fetch("http://localhost:7502/api/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}
