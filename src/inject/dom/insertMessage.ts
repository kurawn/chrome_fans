import { selectors } from "./selectors";

/**
 * Вставляем текст сообщения в поле ввода сообщения в чате
 * @returns - успешно вставлено или нет
 */
export const insertMessage = (text: string): boolean => {
  const inputEl = document.querySelector<HTMLTextAreaElement>(
    selectors.messageInput
  );
  if (!inputEl) {
    return false;
  }

  inputEl.focus();
  // Возможно без этого будет работать нестабильно, потестить
  // await wait(1);

  try {
    document.execCommand("selectAll");
  } catch (e) {}
  try {
    document.execCommand("insertText", false, text);
  } catch (e) {
    return false;
  }

  return true;
};
