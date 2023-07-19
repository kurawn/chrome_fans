/**
 * Достать со страницы на домене chatterbox.one jwt токен
 */
export const parseJwt = () => {
  const rawJwt = document.querySelector("#jwt-token")?.textContent;

  if (!rawJwt) {
    return;
  }

  let jwt = null;
  try {
    jwt = JSON.parse(rawJwt);
  } catch (error) {
    return;
  }

  if (!jwt.access) {
    return null;
  }

  return jwt;
};
