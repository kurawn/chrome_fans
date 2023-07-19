import { Action } from "../../background/background";
import { ButtonT } from "../../background/ChatterboxClient/ChatterboxClient";

export const getButtons = (): Promise<ButtonT[]> =>
  new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: Action.getButtons }, resolve);
  });
