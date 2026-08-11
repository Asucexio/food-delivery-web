const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6000";

// ----- Restaurants (public) -----

export async function getRestaurants() {
  const res = await fetch(`${API_BASE_URL}/restaurants`);
  if (!res.ok) throw new Error("Failed to load restaurants");
  return res.json();
}

export async function getRestaurantById(id: string) {
  const res = await fetch(`${API_BASE_URL}/restaurants/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch restaurant");
  return res.json();
}

export async function getMenuItemsByRestaurantId(restaurantId: string) {
  const res = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}/menu-items`);
  if (!res.ok) throw new Error("Failed to fetch menu items");
  return res.json();
}

// ----- Auth -----

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Failed to login");
  return res.json();
}

export async function register(email: string, password: string, name: string, role: string) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name, role }),
  });
  if (!res.ok) throw new Error("Failed to register");
  return res.json();
}

// ----- Orders (require auth - every call needs the caller's token) -----

export async function getMyOrders(token: string) {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function getOrderById(id: string, token: string) {
  const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch order");
  return res.json();
}

// matches backend: { restaurantId, items: [{ menuItemId, quantity }], deliveryAddress }
export async function createOrder(
  token: string,
  restaurantId: string,
  items: { menuItemId: string; quantity: number }[],
  deliveryAddress: string
) {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ restaurantId, items, deliveryAddress }),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
}

// matches backend: PATCH /orders/:id, body { status } - used by restaurant_owner/driver
export async function updateOrderStatus(id: string, status: string, token: string) {
  const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update order status");
  return res.json();
}
