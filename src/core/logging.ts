import chalk from "chalk";

export const emptyLine = () => console.log("");
export const log = (message: string, color: string = "green") => {
  emptyLine();
  console.log(chalk[color](message));
};
