/**
 * Достать jwt токен из стораджа
 */
export const getJwt = async (): Promise<{
  access: string;
  refresh: string;
} | null> => {
  const { jwt } = await chrome.storage.local.get("jwt");

  return jwt || null;
};
