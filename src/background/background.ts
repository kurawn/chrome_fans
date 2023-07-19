import { ChatterboxClient } from "./ChatterboxClient/ChatterboxClient";

export enum Action {
  getUser = "getUser",
  getButtons = "getButtons",
  generateMessage = "generateMessage",
}

type Message<Payload = any> = {
  type: Action;
  payload: Payload;
};

chrome.runtime.onMessage.addListener(
  (message: Message, sender, sendResponse) => {
    if (!message.type) {
      return;
    }

    switch (message.type) {
      case Action.getUser:
        ChatterboxClient.getUserInfo().then(sendResponse);

        break;
      case Action.generateMessage:
        ChatterboxClient.generateMessage(message.payload).then(sendResponse);

        break;
      case Action.getButtons:
        ChatterboxClient.getButtons().then(sendResponse);

        break;
    }

    return true;
  }
);
