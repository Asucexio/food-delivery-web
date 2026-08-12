export function getRedirectPath(role?: string): string {
  switch (role) {
    case "restaurant_owner":
      return "/dashboard";
    case "driver":
      return "/dashboard";
    case "customer":
    default:
      return "/restaurants";
  }
}