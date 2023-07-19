import { selectors } from "./selectors";

export const showInputLoader = () => {
    const inputloader = document.querySelector(selectors.messageInputLoader);
    if (!inputloader) {
        return;
    }

    inputloader.classList.remove('cb-hide');
    inputloader.classList.add('cb-show');
};

export const hideInputLoader = () => {
    const inputloader = document.querySelector(selectors.messageInputLoader);
    if (!inputloader) {
        return;
    }

    inputloader.classList.remove('cb-show');
    inputloader.classList.add('cb-hide');
};