import i18n from 'i18next';

export const local = (key) => i18n.t(key);
export const lang = () => {
  return localStorage.getItem("i18nextLng") || "en";
};