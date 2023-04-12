/* eslint-disable prefer-const */
import { baseInstance } from "@/api/instance";
export * from "./instance"
export * from "./modules"

import { ElMessage } from 'element-plus'

export const success = () => ElMessage({
  showClose: true,
  message: 'success',
  type: 'success',
})

export const error = (message: string | undefined) => ElMessage({
  showClose: true,
  message: message,
  type: 'error',
})


export const getNowFormatDate = () => {
  const date = new Date();
  let year = date.getFullYear(), //获取完整的年份(4位)
    month = date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
    strDate = date.getDate() // 获取当前日(1-31)
  if (month < 10) (month as any) = `0${month}` // 如果月份是个位数，在前面补0
  if (strDate < 10) (strDate as any) = `0${strDate}` // 如果日是个位数，在前面补0

  return `${year}-${month}-${strDate}`
}

export const caculateFee = (startTime: any) => {

  let sec = new Date().getTime() - new Date(startTime).getTime();
  let fee = Math.floor(sec / 86400000)
  return fee
}

export const loginAccount = (data: any) => {
  return baseInstance({
    url: "/Login",
    method: "post",
    data
  });
}