import { message } from "antd";
// import { logoutService } from "services/login";
import { User } from "types";

const localStorageKey = "__auth_provider_token__";

const tokenObjKey = "__auth_provider_token_obj__";

const apiUrl = process.env.REACT_APP_API_URL;

export interface UserType {
  userType: string;
  uid: number;
  username: string;
}

export interface QrCode {
  code: string;
  qrCode: string;
  expiredAt: number;
}

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const getTokenObj = () => window.localStorage.getItem(tokenObjKey);

export const handleUserResponse = ({ data }: { data: User }) => {
  window.localStorage.setItem(localStorageKey, data.token || "");
  window.localStorage.setItem(
    tokenObjKey,
    data.token ? JSON.stringify(data) : ""
  );
  return data;
};

// 获取用户类型列表
export const mobile_login = ({
  mobile,
  captcha,
}: {
  mobile: string;
  captcha: string;
}) => {
  return fetch(`${apiUrl}/open/mobile_login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ mobile, captcha }),
  }).then(async (response) => {
    if (response.ok) {
      const data = await response.json();
      if (data.code === 0) {
        return data?.data?.users;
      } else {
        message.error(data.message);
        return Promise.reject(data.message);
      }
    } else {
      return Promise.reject(await response.json());
    }
  });
};

// 验证码登录获取token
export const access_token = (userType: {
  userType: string;
  uid: number;
  mobile: string;
}) => {
  return fetch(`${apiUrl}/open/access_token`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userType),
  }).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      if (data.code === 0) return handleUserResponse(data);
      return Promise.reject(data.message);
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const getQrCode = () => {
  return fetch(`${apiUrl}/open/qrcode`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  }).then(async (response) => {
    if (response.ok) {
      const data = await response.json();
      if (data.code === 0) {
        return data.data;
      }
      return Promise.reject(data.message);
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const check_qrcode = (code: string) => {
  return fetch(`${apiUrl}/open/check_qrcode?code=${code}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const logout = async () => {
  try {
    // await logoutService();
  } catch (error) {
    console.error(error);
  } finally {
    window.localStorage.removeItem(localStorageKey);
    window.localStorage.removeItem(tokenObjKey);
  }
};

export const tokenFailLogout = () => {
  window.localStorage.removeItem(localStorageKey);
  window.localStorage.removeItem(tokenObjKey);
}
