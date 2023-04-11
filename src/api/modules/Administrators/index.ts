import { baseInstance } from "@/api/instance";
const { post } = baseInstance;


const createAccount = (account: any) => {
  return baseInstance({
    url: "/Administrator/CreateAccount",
    method: "post",
    data: {
      account
    }
  });
}

const changePermission = (account: any) => {
  return baseInstance({
    url: "/Administrator/ChangePermission",
    method: "post",
    data: {
      account
    }
  });
}

export { createAccount, changePermission }