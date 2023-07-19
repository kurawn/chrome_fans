/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/inject/utils/parseJwt.ts
/**
 * Достать со страницы на домене chatterbox.one jwt токен
 */
const parseJwt = () => {
    const rawJwt = document.querySelector("#jwt-token")?.textContent;
    if (!rawJwt) {
        return;
    }
    let jwt = null;
    try {
        jwt = JSON.parse(rawJwt);
    }
    catch (error) {
        return;
    }
    if (!jwt.access) {
        return null;
    }
    return jwt;
};

;// CONCATENATED MODULE: ./src/inject/inject_chatterbox.ts

(() => {
    const jwt = parseJwt();
    if (!jwt) {
        return;
    }
    chrome.storage.local.set({
        jwt,
    });
})();

/******/ })()
;