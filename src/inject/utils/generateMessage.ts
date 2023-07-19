import { Action } from "../../background/background";
import { QuestionParams } from "../../background/ChatterboxClient/ChatterboxClient";

export const generateMessage = (payload: QuestionParams): Promise<string> =>
  new Promise((resolve) => {
    chrome.runtime.sendMessage(
      { type: Action.generateMessage, payload },
      resolve
    );
  });
