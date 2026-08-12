const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6000";

// ----- Auth -----

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to login");
  }
  return res.json();
}

export async function register(email: string, password: string, name: string, role: string) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name, role }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to register");
  }
  return res.json();
}

export async function getMe(token: string) {
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

// ----- Restaurants -----

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

export async function createRestaurant(token: string, data: {
  name: string;
  address?: string;
  phone_number?: string;
  email?: string;
}) {
  const res = await fetch(`${API_BASE_URL}/restaurants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to create restaurant");
  }
  return res.json();
}

export async function updateRestaurant(id: string, token: string, data: {
  name?: string;
  address?: string;
  phone_number?: string;
  email?: string;
}) {
  const res = await fetch(`${API_BASE_URL}/restaurants/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to update restaurant");
  }
  return res.json();
}

export async function deleteRestaurant(id: string, token: string) {
  const res = await fetch(`${API_BASE_URL}/restaurants/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to delete restaurant");
  }
  return res.json();
}

// ----- Menu Items -----

export async function getMenuItemsByRestaurantId(restaurantId: string) {
  const res = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}/menu-items`);
  if (!res.ok) throw new Error("Failed to fetch menu items");
  return res.json();
}

export async function createMenuItem(restaurantId: string, token: string, data: {
  name: string;
  description?: string;
  price: number;
}) {
  const res = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}/menu-items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to create menu item");
  }
  return res.json();
}

export async function updateMenuItem(id: string, token: string, data: {
  name?: string;
  description?: string;
  price?: number;
}) {
  const res = await fetch(`${API_BASE_URL}/menu-items/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to update menu item");
  }
  return res.json();
}

export async function deleteMenuItem(id: string, token: string) {
  const res = await fetch(`${API_BASE_URL}/menu-items/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to delete menu item");
  }
  return res.json();
}

// ----- Orders -----

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
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to create order");
  }
  return res.json();
}

export async function updateOrderStatus(id: string, status: string, token: string) {
  const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to update order status");
  }
  return res.json();
}

// ----- Driver -----

export async function getAvailableOrders(token: string) {
  const res = await fetch(`${API_BASE_URL}/drivers/orders/available`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch available orders");
  return res.json();
}

export async function acceptOrder(id: string, token: string) {
  const res = await fetch(`${API_BASE_URL}/drivers/orders/${id}/accept`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to accept order");
  }
  return res.json();
}

export async function updateDriverStatus(token: string, isOnline: boolean, vehicleType?: string) {
  const res = await fetch(`${API_BASE_URL}/drivers/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isOnline, vehicleType }),
  });
  if (!res.ok) throw new Error("Failed to update status");
  return res.json();
}