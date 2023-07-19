import { selectors } from "./selectors";

/**
 * Парсим со страницы username собеседника 
 */
export const getFanUsername = (): string => {
    const linkEl = document.querySelector<HTMLAnchorElement>(selectors.fanUsernameLink);
    if (!linkEl) {
        return '';
    }

    // берем последний кусок пути из ссылки на пользователя
    const username = linkEl.href.split('/').pop() || '';

    return username;
};