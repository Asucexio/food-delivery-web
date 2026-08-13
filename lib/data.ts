"use client";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  image: string;
  banner: string;
  address: string;
  menu: MenuItem[];
  tags: string[];
  featured?: boolean;
}

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Burger Palace",
    cuisine: "American · Burgers",
    rating: 4.7,
    reviewCount: 1243,
    deliveryTime: "25–35 min",
    deliveryFee: 2.99,
    minOrder: 12.00,
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
    banner: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&h=400&fit=crop",
    address: "123 Main St, Downtown",
    tags: ["Burgers", "Fast Food", "American"],
    featured: true,
    menu: [
      { id: "b1", name: "Classic Cheeseburger", description: "Juicy beef patty with cheddar, lettuce, tomato & secret sauce", price: 10.99, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop", category: "Burgers", popular: true },
      { id: "b2", name: "Bacon Deluxe", description: "Double patty, crispy bacon, caramelized onions & BBQ sauce", price: 14.99, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=300&h=200&fit=crop", category: "Burgers", popular: true },
      { id: "b3", name: "Veggie Garden Burger", description: "Plant-based patty with avocado, sprouts & garlic aioli", price: 11.99, image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300&h=200&fit=crop", category: "Burgers", vegetarian: true },
      { id: "b4", name: "Spicy Inferno Burger", description: "Jalapeños, pepper jack cheese, hot sauce & crispy onions", price: 13.49, image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&h=200&fit=crop", category: "Burgers", spicy: true },
      { id: "b5", name: "Truffle Mushroom Burger", description: "Wagyu beef, truffle aioli, sautéed mushrooms & gruyère", price: 16.99, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop", category: "Burgers" },
      { id: "b6", name: "Crispy Fries", description: "Golden hand-cut fries with sea salt", price: 4.99, image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=300&h=200&fit=crop", category: "Sides" },
      { id: "b7", name: "Loaded Nachos", description: "Tortilla chips with cheese, jalapeños, salsa & sour cream", price: 7.99, image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300&h=200&fit=crop", category: "Sides", popular: true },
      { id: "b8", name: "Chocolate Milkshake", description: "Rich & creamy with whipped cream", price: 5.99, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&h=200&fit=crop", category: "Drinks" },
    ]
  },
  {
    id: "2",
    name: "Sakura Sushi",
    cuisine: "Japanese · Sushi",
    rating: 4.9,
    reviewCount: 892,
    deliveryTime: "30–45 min",
    deliveryFee: 3.99,
    minOrder: 20.00,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop",
    banner: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=1200&h=400&fit=crop",
    address: "456 Sakura Ave, Midtown",
    tags: ["Sushi", "Japanese", "Seafood"],
    featured: true,
    menu: [
      { id: "s1", name: "Salmon Nigiri (6 pcs)", description: "Fresh Atlantic salmon on seasoned rice", price: 12.99, image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=300&h=200&fit=crop", category: "Nigiri", popular: true },
      { id: "s2", name: "Spicy Tuna Roll", description: "Spicy tuna, cucumber, avocado & sesame seeds", price: 10.99, image: "https://images.unsplash.com/photo-1617196034183-421b491d3c43?w=300&h=200&fit=crop", category: "Rolls", popular: true, spicy: true },
      { id: "s3", name: "Dragon Roll", description: "Shrimp tempura, eel, avocado & unagi sauce", price: 15.99, image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop", category: "Rolls", popular: true },
      { id: "s4", name: "Veggie Maki Set", description: "Cucumber, avocado, asparagus & pickled radish rolls", price: 9.99, image: "https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=300&h=200&fit=crop", category: "Rolls", vegetarian: true },
      { id: "s5", name: "Sashimi Platter", description: "Assorted fresh sashimi: salmon, tuna, yellowtail & scallop", price: 24.99, image: "https://images.unsplash.com/photo-1534256958597-7fe685cbd745?w=300&h=200&fit=crop", category: "Sashimi" },
      { id: "s6", name: "Miso Soup", description: "Traditional miso with tofu, wakame & green onion", price: 3.99, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=200&fit=crop", category: "Sides" },
      { id: "s7", name: "Green Tea Ice Cream", description: "Matcha green tea ice cream", price: 4.99, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=200&fit=crop", category: "Desserts" },
    ]
  },
  {
    id: "3",
    name: "Mama's Pizza",
    cuisine: "Italian · Pizza",
    rating: 4.5,
    reviewCount: 2156,
    deliveryTime: "35–50 min",
    deliveryFee: 1.99,
    minOrder: 15.00,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop",
    banner: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&h=400&fit=crop",
    address: "789 Pizza Lane, Uptown",
    tags: ["Pizza", "Italian", "Pasta"],
    featured: true,
    menu: [
      { id: "p1", name: "Margherita Classic", description: "San Marzano tomato, fresh mozzarella, basil & olive oil", price: 12.99, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=200&fit=crop", category: "Pizza", vegetarian: true, popular: true },
      { id: "p2", name: "Pepperoni Feast", description: "Double pepperoni, mozzarella & oregano on tomato base", price: 15.99, image: "https://images.unsplash.com/photo-1628840042765-356cda075304?w=300&h=200&fit=crop", category: "Pizza", popular: true },
      { id: "p3", name: "Diavola", description: "Spicy salami, chili flakes, mozzarella & tomato", price: 16.99, image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4f?w=300&h=200&fit=crop", category: "Pizza", spicy: true },
      { id: "p4", name: "Quattro Formaggi", description: "Mozzarella, gorgonzola, parmesan & fontina", price: 17.99, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop", category: "Pizza", vegetarian: true },
      { id: "p5", name: "Carbonara Pasta", description: "Spaghetti with egg, pancetta, parmesan & black pepper", price: 14.99, image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=300&h=200&fit=crop", category: "Pasta", popular: true },
      { id: "p6", name: "Garlic Bread", description: "Toasted ciabatta with garlic butter & herbs", price: 5.99, image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=300&h=200&fit=crop", category: "Sides", vegetarian: true },
      { id: "p7", name: "Tiramisu", description: "Classic Italian coffee-flavored dessert", price: 7.99, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop", category: "Desserts", popular: true },
    ]
  },
  {
    id: "4",
    name: "Taco Fiesta",
    cuisine: "Mexican · Tacos",
    rating: 4.6,
    reviewCount: 678,
    deliveryTime: "20–30 min",
    deliveryFee: 1.49,
    minOrder: 10.00,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
    banner: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=1200&h=400&fit=crop",
    address: "321 Fiesta Blvd, Westside",
    tags: ["Mexican", "Tacos", "Burritos"],
    menu: [
      { id: "t1", name: "Carne Asada Tacos (3)", description: "Grilled steak, cilantro, onion & lime on corn tortillas", price: 11.99, image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300&h=200&fit=crop", category: "Tacos", popular: true },
      { id: "t2", name: "Fish Tacos (3)", description: "Baja-style fish, cabbage slaw, chipotle crema & pico", price: 12.99, image: "https://images.unsplash.com/photo-1512838243191-081f5d7f5b1e?w=300&h=200&fit=crop", category: "Tacos", popular: true },
      { id: "t3", name: "Chicken Burrito", description: "Grilled chicken, rice, beans, cheese, sour cream & salsa", price: 10.99, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&h=200&fit=crop", category: "Burritos" },
      { id: "t4", name: "Veggie Quesadilla", description: "Grilled peppers, mushrooms, cheese & guacamole", price: 9.99, image: "https://images.unsplash.com/photo-1599974579688-1db4b5a5d6c0?w=300&h=200&fit=crop", category: "Quesadillas", vegetarian: true },
      { id: "t5", name: "Elote (Mexican Street Corn)", description: "Grilled corn with mayo, cotija cheese, chili & lime", price: 5.99, image: "https://images.unsplash.com/photo-1626202158822-6f6c8b0b1e3d?w=300&h=200&fit=crop", category: "Sides", vegetarian: true },
      { id: "t6", name: "Churros with Chocolate", description: "Crispy cinnamon churros with warm chocolate dip", price: 6.99, image: "https://images.unsplash.com/photo-1624373770870-7d5e8c4e3932?w=300&h=200&fit=crop", category: "Desserts", popular: true },
      { id: "t7", name: "Horchata", description: "Sweet rice milk with cinnamon", price: 3.99, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=200&fit=crop", category: "Drinks" },
    ]
  },
  {
    id: "5",
    name: "Curry House",
    cuisine: "Indian · Curry",
    rating: 4.8,
    reviewCount: 534,
    deliveryTime: "30–40 min",
    deliveryFee: 2.49,
    minOrder: 18.00,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
    banner: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1200&h=400&fit=crop",
    address: "555 Spice Rd, Eastside",
    tags: ["Indian", "Curry", "Spicy"],
    menu: [
      { id: "c1", name: "Butter Chicken", description: "Tandoori chicken in rich tomato-butter cream sauce", price: 16.99, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&h=200&fit=crop", category: "Curry", popular: true },
      { id: "c2", name: "Chicken Tikka Masala", description: "Grilled chicken chunks in spiced tomato curry", price: 15.99, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop", category: "Curry", popular: true },
      { id: "c3", name: "Palak Paneer", description: "Cottage cheese in creamy spinach sauce", price: 13.99, image: "https://images.unsplash.com/photo-1606471191009-63994c53433b?w=300&h=200&fit=crop", category: "Curry", vegetarian: true },
      { id: "c4", name: "Lamb Vindaloo", description: "Tender lamb in fiery vinegar-based curry", price: 18.99, image: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=300&h=200&fit=crop", category: "Curry", spicy: true },
      { id: "c5", name: "Garlic Naan", description: "Freshly baked naan with garlic & butter", price: 3.99, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop", category: "Bread", vegetarian: true, popular: true },
      { id: "c6", name: "Biryani (Chicken)", description: "Fragrant basmati rice with spiced chicken & saffron", price: 14.99, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300&h=200&fit=crop", category: "Rice" },
      { id: "c7", name: "Gulab Jamun", description: "Warm milk dumplings in rose syrup", price: 5.99, image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd0?w=300&h=200&fit=crop", category: "Desserts", popular: true },
    ]
  },
  {
    id: "6",
    name: "Green Bowl",
    cuisine: "Healthy · Salads",
    rating: 4.4,
    reviewCount: 445,
    deliveryTime: "15–25 min",
    deliveryFee: 0.99,
    minOrder: 8.00,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    banner: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=400&fit=crop",
    address: "777 Health St, Northside",
    tags: ["Healthy", "Salads", "Vegan"],
    menu: [
      { id: "g1", name: "Superfood Salad", description: "Kale, quinoa, avocado, blueberries, almonds & lemon dressing", price: 13.99, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop", category: "Salads", vegetarian: true, popular: true },
      { id: "g2", name: "Grilled Chicken Caesar", description: "Romaine, parmesan, croutons & classic Caesar dressing", price: 12.99, image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=300&h=200&fit=crop", category: "Salads", popular: true },
      { id: "g3", name: "Buddha Bowl", description: "Brown rice, chickpeas, roasted veggies, tahini & hemp seeds", price: 11.99, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop", category: "Bowls", vegetarian: true },
      { id: "g4", name: "Salmon Poke Bowl", description: "Fresh salmon, sushi rice, edamame, cucumber & ponzu", price: 15.99, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop", category: "Bowls", popular: true },
      { id: "g5", name: "Acai Smoothie Bowl", description: "Acai blend topped with granola, banana & coconut", price: 9.99, image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=200&fit=crop", category: "Bowls", vegetarian: true },
      { id: "g6", name: "Cold-Pressed Juice", description: "Fresh kale, apple, ginger & lemon juice", price: 6.99, image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=300&h=200&fit=crop", category: "Drinks", vegetarian: true },
    ]
  }
];

export const categories = [
  { id: "all", name: "All", icon: "🍽️" },
  { id: "burgers", name: "Burgers", icon: "🍔" },
  { id: "pizza", name: "Pizza", icon: "🍕" },
  { id: "sushi", name: "Sushi", icon: "🍣" },
  { id: "mexican", name: "Mexican", icon: "🌮" },
  { id: "indian", name: "Indian", icon: "🍛" },
  { id: "healthy", name: "Healthy", icon: "🥗" },
  { id: "desserts", name: "Desserts", icon: "🍰" },
];

export function getRestaurantById(id: string): Restaurant | undefined {
  return restaurants.find((r) => r.id === id);
}

export function getFeaturedRestaurants(): Restaurant[] {
  return restaurants.filter((r) => r.featured);
}
