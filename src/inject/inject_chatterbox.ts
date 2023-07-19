import { parseJwt } from "./utils/parseJwt";

(() => {
  const jwt = parseJwt();

  if (!jwt) {
    return;
  }

  chrome.storage.local.set({
    jwt,
  });
})();
