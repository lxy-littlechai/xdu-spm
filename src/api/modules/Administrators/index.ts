import { baseInstance } from "@/api/instance";
const { post } = baseInstance;
import { AccountParams, ResAccountParams } from "./types";

const createAccount = (params: AccountParams) => {
  return post<ResAccountParams>("/url", params);
}

export { createAccount }
