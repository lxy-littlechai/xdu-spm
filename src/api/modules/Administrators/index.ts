import { baseInstance } from "@/api/instance";
const { post } = baseInstance;

const getAccount = (data: any) => {
  return baseInstance({
    url: "/Administrator/GetAccount",
    method: "post",
    data
  })
}

const createAccount = (data: any) => {
  return baseInstance({
    url: "/Administrator/CreateAccount",
    method: "post",
    data
  });
}

const changePermission = (data: any) => {
  return baseInstance({
    url: "/Administrator/ChangePermission",
    method: "post",
    data
  });
}

export { createAccount, changePermission, getAccount }