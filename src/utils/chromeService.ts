export const storeData = (data: Object) => {
  localStorage.setItem("secret", JSON.stringify(data));
  // chrome.storage.local.set({ secret: data });
};

export const getData = () => {
  return localStorage.getItem("secret") || "";
  // return chrome.storage.local.get("secret", (data) => {
  //   console.log("data secret", data);
  //   return data;
  // });
};

export const RemoveData = () => {
  localStorage.removeItem("secret");
  // chrome.storage.local.remove("myData");
};
