import { baseInstance } from "@/api/instance";
const { post } = baseInstance

import { SystemDataParams } from "./types"

const getSystemData = () => {
  return post<SystemDataParams>("/url");
}

export { getSystemData }