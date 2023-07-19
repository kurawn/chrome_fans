import { Action } from "../../background/background";
import { User } from "../../background/ChatterboxClient/ChatterboxClient";

export const getUserInfo = (): Promise<User> =>
  new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: Action.getUser }, resolve);
  });
