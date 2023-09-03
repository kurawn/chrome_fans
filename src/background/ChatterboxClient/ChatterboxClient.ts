import { getJwt } from "../../utils/getJwt";
import { urls } from "../../utils/urls";

type RequestProps =
  | {
      method: "GET";
      query?: Record<string, string>;
      noAuth?: boolean;
    }
  | {
      method: "POST";
      body?: any;
      noAuth?: boolean;
    };

export type User = {
  username: string;
  email: string;
  getBalance: string;
};

export type UserAPI = {
  username: string;
  email: string;
  get_balance: string;
};

export type ButtonT = {
  type: string;
  text: string;
};

export type QuestionParams = {
  fanUsername: string;
  setupMessages: string;
  prompt: string;
};

export class ChatterboxClient {
  static async getUserInfo(): Promise<User | null> {
    const [response] =
      (await this.apiCall<UserAPI[]>(urls.api.USER.INFO, {
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

  static async getButtons(): Promise<ButtonT[]> {
    const response = await this.apiCall<ButtonT[]>(urls.api.INTERFACE.BUTTONS, {
      method: "GET",
      noAuth: true,
    });

    if (!response) {
      return [{ text: "NO RESPONSE", type: ":(" }];
    }

    return response;
  }

  static async generateMessage(params: QuestionParams): Promise<string | null> {
    console.log('sfsd')
    topic = window.prompt("What do you want to tweet about?", lastTopic) || 'Twitter';
    await chrome.storage.local.set({'lastTopic': topic});
    const response = await this.apiCall<{ answer: string }>(
      urls.api.INTERFACE.CHAT_QUESTION,
      {
        method: "POST",
        body: {
          set_up_messages: params.setupMessages,
          prompt: params.prompt,
          fan_username: params.fanUsername,
        },
      }
    );
    console.log(response)

    if (!response) {
      return null;
    }

    return response.answer;
  }

  static async apiCall<ResponseType = any>(
    url: string,
    props: RequestProps
  ): Promise<ResponseType | null> {
    let requestUrl = url;

    if (props.method === "GET" && props.query) {
      requestUrl += '?' + Object.entries(props.query).map(([key, value]) => `${key}=${value}`).join('&')
    }

    const jwt = await getJwt();

    if (jwt === null && !props.noAuth) {
      console.error("token not provided");
      return null;
    }

    const options: RequestInit = {
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
      .then((res) => res.json() as ResponseType)
      .catch(() => null);
  }
}
