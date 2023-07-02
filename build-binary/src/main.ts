import { Utils } from "./utils";

export const mainAsync = async (argv: any) => {
  setInterval(() => {
    Utils.Println("hello");
  }, 1000);
};
