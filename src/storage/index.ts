import Cookies from "js-cookie";

export const storageUtil = {
  set: (key: string, value: any, expiresDays = 7) => {
    const plainValue =
      typeof value === "string" ? value : JSON.stringify(value);

    Cookies.set(key, plainValue, {
      expires: expiresDays,
      secure: true,
      sameSite: "Strict",
    });
  },

  get: (key: string) => {
    const value = Cookies.get(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return null;
  },

  remove: (key: string) => {
    Cookies.remove(key);
  },
};
