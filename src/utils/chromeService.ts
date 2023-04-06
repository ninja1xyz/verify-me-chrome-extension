export const storeData = (data: Object) => {
  chrome?.storage?.local?.set({ secret: JSON.stringify(data) });
};

export const getData = async () => {
  const data = await chrome?.storage?.local?.get("secret");
  return data?.secret || "";
};

export const RemoveData = () => {
  chrome?.storage?.local?.remove("myData");
};
