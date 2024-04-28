import colors from "tailwindcss/colors";
import { DefaultColors } from "tailwindcss/types/generated/colors";

export const randomColor = () => {
  const dd = Object.keys(colors as DefaultColors);

  return dd[Math.floor(Math.random() * dd.length)];
};
