import { ButtonT } from "../../background/ChatterboxClient/ChatterboxClient";
import { Loader } from "../../components/Loader";
import { PromptButtonsPanel } from "../../components/PromptButtonsPanel";
import { getJwt } from "../../utils/getJwt";
import { parseJwt } from "../utils/parseJwt";
import { hideInputLoader } from "./inputLoader";
import { selectors } from "./selectors";

/**
 * Вставить кнопки-подсказки о типе генерируемого сообщения в форму ввода сообщения в чате
 * @returns - вставлены ли кнопки успешно
 */
export const injectPromptButtons = async (
  buttonsPromise: Promise<ButtonT[]>,
  onButtonClick: (type: string) => Promise<void>
): Promise<boolean> => {
  const form = document.querySelector(selectors.messageForm);
  if (!form) {
    console.log("no form");
    return false;
  }

  const buttons = await buttonsPromise;

  const isAuthorized = Boolean((await getJwt())?.access);

  // если уже встроена панель с кнопками - повторно не встраиваем
  const promptButtonsPanel = document.querySelector(
    selectors.cbPromptButtonsPanel
  );
  if (promptButtonsPanel) {
    return true;
  }

  form.insertAdjacentElement(
    "afterbegin",
    PromptButtonsPanel({
      buttons,
      onButtonClick,
      isAuthorized,
    })
  );

  // встраиваем заранее лоадер около поля ввода сообщения
  const inputParent = form.querySelector(selectors.messageInputParent);
  const loader = Loader();
  loader.classList.add('cb-input-loader');
  inputParent?.insertAdjacentElement("afterbegin", loader);
  hideInputLoader();

  return true;
};
