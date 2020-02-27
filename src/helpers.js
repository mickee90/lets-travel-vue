export const capitalizeFirstLetter = string => {
  return string[0].toUpperCase() + string.slice(1);
};

export const getDate = (date = "") => {
  const chosenDate = date ? date : new Date();

  return new Date(chosenDate).toISOString().split("T")[0];
};
