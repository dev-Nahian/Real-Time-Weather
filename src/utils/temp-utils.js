export const convertTemp = (temp, unit) => {
  if (temp === undefined || temp === null || temp === "") return "";
  const numericTemp = parseFloat(temp);
  if (isNaN(numericTemp)) return temp;
  
  if (unit === "F") {
    return Math.round((numericTemp * 9) / 5 + 32);
  }
  return Math.round(numericTemp);
};
