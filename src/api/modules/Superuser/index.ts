import { baseInstance } from "@/api/instance";


const getSystemLog = (data: any) => {
  return baseInstance({
    url: "/Superuser/Log",
    method: 'post',
    data
  });
}

const getAllborrowedBook = (data: any) => {
  return baseInstance({
    url: "/Superuser/GetAllborrowedBook",
    method: 'post',
    data
  });
}

const getAllUser = (data: any) => {
  return baseInstance({
    url: "/Superuser/GetAllUser",
    method: 'post',
    data
  });
}


export { getSystemLog, getAllborrowedBook, getAllUser };