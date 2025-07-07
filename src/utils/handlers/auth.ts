import { storageUtil } from "@/storage";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/features/login/constant";

/**
 * Checks if a JWT token is expired by decoding its payload
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch (err) {
    return true; // Assume token is invalid if decoding fails
  }
};

/**
 * Clears all authentication tokens and redirects to login page
 */
export const clearTokensAndRedirectToLogin = () => {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    return;
  }

  // Clear tokens from storage
  storageUtil.remove(ACCESS_TOKEN);
  storageUtil.remove(REFRESH_TOKEN);

  // Clear tokens from cookies as well (for middleware)
  document.cookie = `${ACCESS_TOKEN}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `${REFRESH_TOKEN}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

  // Redirect to login page
  window.location.href = "/login";
};

/**
 * Checks if user has valid tokens (exist and not expired)
 */
export const areTokensValid = (): boolean => {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    return false;
  }

  const accessToken = storageUtil.get(ACCESS_TOKEN);
  const refreshToken = storageUtil.get(REFRESH_TOKEN);

  // Tokens are valid if they exist and are not expired
  return (
    accessToken &&
    refreshToken &&
    !isTokenExpired(accessToken) &&
    !isTokenExpired(refreshToken)
  );
};
