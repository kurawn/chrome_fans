/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 168:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "A": () => (/* binding */ getJwt)
/* harmony export */ });
/**
 * Достать jwt токен из стораджа
 */
const getJwt = async () => {
    const { jwt } = await chrome.storage.local.get("jwt");
    return jwt || null;
};


/***/ }),

/***/ 101:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "j": () => (/* binding */ urls)
/* harmony export */ });
const BASE_API_URL = 'https://chatterbox.one';
const url = (...path) => [BASE_API_URL, ...path].join('/');
const apiUrl = (...path) => url('api', ...path);
const apiUser = (...path) => apiUrl('user', ...path);
const apiInterface = (...path) => apiUrl('interface', ...path);
const urls = {
    api: {
        USER: {
            INFO: apiUser('info'),
            TOKEN_REFRESH: apiUser('token/refresh'),
        },
        INTERFACE: {
            BUTTONS: apiInterface('buttons'),
            CHAT_QUESTION: apiInterface('chat/question/')
        }
    },
    external: {
        ACCOUNT_MY: url('account/my'),
        CHATTERBOX: url()
    }
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

// UNUSED EXPORTS: Action

// EXTERNAL MODULE: ./src/utils/getJwt.ts
var getJwt = __webpack_require__(168);
// EXTERNAL MODULE: ./src/utils/urls.ts
var urls = __webpack_require__(101);
;// CONCATENATED MODULE: ./src/background/ChatterboxClient/ChatterboxClient.ts


class ChatterboxClient {
    static async getUserInfo() {
        const [response] = (await this.apiCall(urls/* urls.api.USER.INFO */.j.api.USER.INFO, {
            method: "GET",
        })) || [];
        if (!response) {
            return null;
        }
        return {
            ...response,
            getBalance: response.get_balance,
        };
    }
    static async getButtons() {
        const response = await this.apiCall(urls/* urls.api.INTERFACE.BUTTONS */.j.api.INTERFACE.BUTTONS, {
            method: "GET",
            noAuth: true,
        });
        if (!response) {
            return [{ text: "NO RESPONSE", type: ":(" }];
        }
        return response;
    }
    static async generateMessage(params) {
        const response = await this.apiCall(urls/* urls.api.INTERFACE.CHAT_QUESTION */.j.api.INTERFACE.CHAT_QUESTION, {
            method: "POST",
            body: {
                set_up_messages: params.setupMessages,
                prompt: params.prompt,
                fan_username: params.fanUsername,
            },
        });
        if (!response) {
            return null;
        }
        return response.answer;
    }
    static async apiCall(url, props) {
        let requestUrl = url;
        if (props.method === "GET" && props.query) {
            requestUrl += '?' + Object.entries(props.query).map(([key, value]) => `${key}=${value}`).join('&');
        }
        const jwt = await (0,getJwt/* getJwt */.A)();
        if (jwt === null && !props.noAuth) {
            console.error("token not provided");
            return null;
        }
        const options = {
            method: props.method,
        };
        options.headers = {};
        if (jwt?.access) {
            options.headers.authorization = `Bearer ${jwt.access}`;
        }
        if (props.method === "POST") {
            options.body = JSON.stringify(props.body);
            options.headers['Content-Type'] = 'application/json; charset=utf-8';
        }
        console.log(requestUrl, options);
        return fetch(requestUrl, options)
            .then((res) => res.json())
            .catch(() => null);
    }
}

;// CONCATENATED MODULE: ./src/background/background.ts

var Action;
(function (Action) {
    Action["getUser"] = "getUser";
    Action["getButtons"] = "getButtons";
    Action["generateMessage"] = "generateMessage";
})(Action || (Action = {}));
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
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
});

})();

/******/ })()
;