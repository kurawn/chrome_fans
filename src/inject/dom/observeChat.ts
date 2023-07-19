import { selectors } from "./selectors";

export const useObserveChat = (onChatRendered: () => void) => {
  const config = { attributes: false, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback: MutationCallback = () => {
    const form = document.querySelector(selectors.messageForm);
    if (!form) {
      return;
    }

    onChatRendered();
  };

  const observer = new MutationObserver(callback);

  observer.observe(document, config);

  return () => observer.disconnect();
};
