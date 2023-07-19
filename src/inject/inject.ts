import { urls } from "../utils/urls";
import { generateMessage } from "./utils/generateMessage";
import { getButtons } from "./utils/getButtons";
import { injectPromptButtons } from "./dom/injectPromptButtons";
import { parseChatHistory } from "./dom/parseChatHistory";
import { getFanUsername } from "./dom/getFanUsername";
import { insertMessage } from "./dom/insertMessage";
import { useObserveChat } from "./dom/observeChat";
import { getJwt } from "../utils/getJwt";
import { hideInputLoader, showInputLoader } from "./dom/inputLoader";

(async () => {
  console.log("chatterbox inject");
  const onButtonClick = async (type: string) => {
    const setupMessages = parseChatHistory();

    const jwt = await getJwt();

    if (!jwt?.access) {
      window.open(urls.external.ACCOUNT_MY);
      return;
    }

    const fanUsername = getFanUsername();

    showInputLoader();
    const message = await generateMessage({
      prompt: type,
      setupMessages,
      fanUsername,
    });
    hideInputLoader();

    insertMessage(message);
  };

  const buttonsPromise = getButtons();

  useObserveChat(async () => {
    injectPromptButtons(buttonsPromise, onButtonClick);
  });
})();
