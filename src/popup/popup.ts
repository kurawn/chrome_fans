import { getUserInfo } from "../inject/utils/getUserInfo";
import { urls } from "../utils/urls";
import { renderUserCard } from "./renderUserCard";

(async () => {
  const loginButton = document.querySelector(
    'button[data-id="cb-login-button"]'
  );

  if (!loginButton) {
    return;
  }

  loginButton.addEventListener("click", () => {
    window.open(urls.external.ACCOUNT_MY);
  });

  const { jwt } = await chrome.storage.local.get('jwt');

  if (!jwt) {
    loginButton.classList.remove('hide');
    return;
  }

  const loader = document.querySelector('.loader');
  if (!loader) {
    return;
  }

  loader.classList.add('hide');

  const user = await getUserInfo();

  const content = document.querySelector('.content');

  if (!content) {
    return;
  }

  content.innerHTML = renderUserCard(user);
})();
