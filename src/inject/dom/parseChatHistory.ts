import { selectors } from "./selectors";

/**
 * Получить из документа все сообщения из чата
 * @returns - строка со всеми сообщениями с подписями об авторах
 */
export const parseChatHistory = (): string => {
  return [...document.querySelectorAll(selectors.messageItem)].map((el) => {
    const text = el.querySelector<HTMLDivElement>(selectors.messageItemText)?.innerText || "";
    const author = el.classList.contains("m-from-me") ? "model" : "fan";

    return `${author}: ${text}`;
  }).join('\n');
};
