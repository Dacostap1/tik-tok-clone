export const useHelper = () => {
  const toLowerCaseAndTrim = (str) => {
    return str.split(" ").join("").toLowerCase();
  };

  return { toLowerCaseAndTrim };
};
