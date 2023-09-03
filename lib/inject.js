/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 589:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "a": () => (/* binding */ Action)
});

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


/***/ }),

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
    console.log(jwt)

    return jwt || null;
};


/***/ }),

/***/ 101:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "j": () => (/* binding */ urls)
/* harmony export */ });
const BASE_API_URL = 'http://127.0.0.1:8000';
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

// EXTERNAL MODULE: ./src/utils/urls.ts
var urls = __webpack_require__(101);
// EXTERNAL MODULE: ./src/background/background.ts + 1 modules
var background = __webpack_require__(589);
;// CONCATENATED MODULE: ./src/inject/utils/generateMessage.ts

const generateMessage = (payload) => new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: background/* Action.generateMessage */.a.generateMessage, payload }, resolve);
});

;// CONCATENATED MODULE: ./src/inject/utils/getButtons.ts

const getButtons = () => new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: background/* Action.getButtons */.a.getButtons }, resolve);
});

;// CONCATENATED MODULE: ./src/components/Loader.ts
const Loader = () => {
    const loader = document
        .querySelector(".infinite-loading-container .g-icon")
        ?.cloneNode(true);
    return loader;
};

;// CONCATENATED MODULE: ./src/components/PromptButtonsPanel.ts

const PromptButtonsPanel = ({ buttons, onButtonClick, isAuthorized, }) => {
    const container = document.createElement("div");
    const authContent = `
    ${buttons
        .map(({ text, type }) => `<button class="cb-button_secondary" data-type="${type}">${text}</button>`)
        .join("")}
    <a href="${urls/* urls.external.CHATTERBOX */.j.external.CHATTERBOX}" class="cb-hint cb-promo-hint" target="_blank" rel="noopener noreferrer">by dsds</a>`;
    const notAuthContent = `<a href="${urls/* urls.external.ACCOUNT_MY */.j.external.ACCOUNT_MY}" class="cb-hint" target="_blank" rel="noopener noreferrer">Войти в ...</a>`;
    container.innerHTML = `
    <div class="cb-prompt-buttons-panel">
       ${isAuthorized ? authContent : notAuthContent}
    </div>
    `;
    const buttonElements = [
        ...container.querySelectorAll("button[data-type]"),
    ];
    buttonElements.forEach((btn) => btn.addEventListener("click", (event) => {
        event.preventDefault();
        const { currentTarget } = event;
        if (!currentTarget) {
            return;
        }
        const { type } = currentTarget.dataset;
        if (!type) {
            return;
        }
        onButtonClick(type);
    }));
    return container.querySelector("div");
};

// EXTERNAL MODULE: ./src/utils/getJwt.ts
var getJwt = __webpack_require__(168);
;// CONCATENATED MODULE: ./src/inject/dom/selectors.ts
var selectors;
(function (selectors) {
    /**
     * Форма набора сообщения.
     * Включает поле в том числе, а также кнопки медиа, донат, гиф.
     * Сюда же встраиваем кнопки с подсказками о типе генерируемого сообщения.
     */
    selectors["messageForm"] = "#make_post_form";
    /**
     * Оберка поля ввода
     */
    selectors["messageInputParent"] = ".v-text-field__slot";
    /**
     * Непосредственно поле ввода
     */
    selectors["messageInput"] = "#new_post_text_input";
    /**
     * Лоадер на поле ввода
     */
    selectors["messageInputLoader"] = ".v-text-field__slot .g-icon";
    /**
     * Сообщение из чата
     */
    selectors["messageItem"] = "[at-attr=\"chat_message\"]";
    /**
     * Текст сообщения из чата
     */
    selectors["messageItemText"] = "[at-attr=\"message_text\"]";
    /**
     * Ссылка на собеседника на экране чата
     */
    selectors["fanUsernameLink"] = ".b-chat__header__title .g-user-realname__wrapper";
    /**
     * Панель с кнопками-подсказками, встраиваемая данным расширением
     */
    selectors["cbPromptButtonsPanel"] = ".cb-prompt-buttons-panel";
})(selectors || (selectors = {}));

;// CONCATENATED MODULE: ./src/inject/dom/inputLoader.ts

const showInputLoader = () => {
    const inputloader = document.querySelector(selectors.messageInputLoader);
    if (!inputloader) {
        return;
    }
    inputloader.classList.remove('cb-hide');
    inputloader.classList.add('cb-show');
};
const hideInputLoader = () => {
    const inputloader = document.querySelector(selectors.messageInputLoader);
    if (!inputloader) {
        return;
    }
    inputloader.classList.remove('cb-show');
    inputloader.classList.add('cb-hide');
};

;// CONCATENATED MODULE: ./src/inject/dom/injectPromptButtons.ts





/**
 * Вставить кнопки-подсказки о типе генерируемого сообщения в форму ввода сообщения в чате
 * @returns - вставлены ли кнопки успешно
 */
const injectPromptButtons = async (buttonsPromise, onButtonClick) => {
    const form = document.querySelector(selectors.messageForm);
    if (!form) {
        console.log("no form");
        return false;
    }
    const buttons = await buttonsPromise;
    const isAuthorized = Boolean((await (0,getJwt/* getJwt */.A)())?.access);
    // если уже встроена панель с кнопками - повторно не встраиваем
    const promptButtonsPanel = document.querySelector(selectors.cbPromptButtonsPanel);
    if (promptButtonsPanel) {
        return true;
    }
    form.insertAdjacentElement("afterbegin", PromptButtonsPanel({
        buttons,
        onButtonClick,
        isAuthorized,
    }));
    // встраиваем заранее лоадер около поля ввода сообщения
    const inputParent = form.querySelector(selectors.messageInputParent);
    const loader = Loader();
    loader.classList.add('cb-input-loader');
    inputParent?.insertAdjacentElement("afterbegin", loader);
    hideInputLoader();
    return true;
};

;// CONCATENATED MODULE: ./src/inject/dom/parseChatHistory.ts

/**
 * Получить из документа все сообщения из чата
 * @returns - строка со всеми сообщениями с подписями об авторах
 */
const parseChatHistory = () => {
    return [...document.querySelectorAll(selectors.messageItem)].map((el) => {
        const text = el.querySelector(selectors.messageItemText)?.innerText || "";
        const author = el.classList.contains("m-from-me") ? "model" : "fan";
        return `${author}: ${text}`;
    }).join('\n');
};

;// CONCATENATED MODULE: ./src/inject/dom/getFanUsername.ts

/**
 * Парсим со страницы username собеседника
 */
const getFanUsername = () => {
    const linkEl = document.querySelector(selectors.fanUsernameLink);
    if (!linkEl) {
        return '';
    }
    // берем последний кусок пути из ссылки на пользователя
    const username = linkEl.href.split('/').pop() || '';
    return username;
};

;// CONCATENATED MODULE: ./src/inject/dom/insertMessage.ts

/**
 * Вставляем текст сообщения в поле ввода сообщения в чате
 * @returns - успешно вставлено или нет
 */
const insertMessage = (text) => {
    const inputEl = document.querySelector(selectors.messageInput);
    if (!inputEl) {
        return false;
    }
    inputEl.focus();
    // Возможно без этого будет работать нестабильно, потестить
    // await wait(1);
    try {
        document.execCommand("selectAll");
    }
    catch (e) { }
    try {
        document.execCommand("insertText", false, text);
    }
    catch (e) {
        return false;
    }
    return true;
};

;// CONCATENATED MODULE: ./src/inject/dom/observeChat.ts

const useObserveChat = (onChatRendered) => {
    const config = { attributes: false, childList: true, subtree: true };
    // Callback function to execute when mutations are observed

    const callback = () => {
        const form = document.querySelector(selectors.messageForm);
        if (!form) {
            return;
        }
        onChatRendered();
    };
    const observer = new MutationObserver(callback);
    observer.observe(document, config);
    return () => observer.disconnect();
};

;// CONCATENATED MODULE: ./src/inject/inject.ts










(async () => {
    console.log("chatterbox inject");
    const onButtonClick = async (type) => {
        const setupMessages = parseChatHistory();
        const jwt = await (0,getJwt/* getJwt */.A)();
        if (!jwt?.access) {
            window.open(urls/* urls.external.ACCOUNT_MY */.j.external.ACCOUNT_MY);
            return;
        }
        const fanUsername = getFanUsername();
        showInputLoader();
        const message = await generateMessage({
            prompt: type,
            setupMessages,
            fanUsername,
        });
        hideInputLoader();
        insertMessage(message);
    };
    const buttonsPromise = getButtons();
    useObserveChat(async () => {
        injectPromptButtons(buttonsPromise, onButtonClick);
    });
})();

})();

/******/ })()
;