const BASE_API_URL = 'http://127.0.0.1:8000';
const url = (...path: string[]) => [BASE_API_URL, ...path].join('/');
const apiUrl = (...path: string[]) => url('api', ...path);

const apiUser = (...path: string[]) => apiUrl('user', ...path);
const apiInterface = (...path: string[]) => apiUrl('interface', ...path);

export const urls = {
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