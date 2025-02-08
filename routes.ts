export const dashboardRoutes = ["/dashboard/:path*"];

export const authRoutes = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
];

export const publicRoutes = [
  "/",
  "/about",
  "/contact",
  "/terms",
  "/privacy-policy",
  "/404",
  "/500",
  "/verify-email",
];

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

export const apiRoutePrefix = "/api/auth";
