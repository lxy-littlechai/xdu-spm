import { baseInstance } from "@/api/instance";


const getSystemLog = (data: any) => {
  return baseInstance({
    url: "/Superuser/Log",
    method: 'post',
    data
  });
}


export { getSystemLog };