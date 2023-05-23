/* eslint-disable prefer-const */
import { baseInstance } from "@/api/instance";
export * from "./instance"
export * from "./modules"

import { ElMessage } from 'element-plus'
import { getBorrowedBookLists } from "./modules/Patron";

export const success = (message: string | undefined) => ElMessage({
  showClose: true,
  message: 'success',
  type: 'success',
})

export const error = (message: string | undefined) => ElMessage({
  showClose: true,
  message: message,
  type: 'error',
})

export const warning = (message: string | undefined) => ElMessage({
  showClose: true,
  message: message,
  type: 'warning',
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

export const free4BorrowDays = 14;

export const getDay = (startTime: any) => {
  let sec = new Date().getTime() - new Date(startTime).getTime();
  let day = Math.floor(sec / 86400000)
  return day;
}

export const calculateFee = (startTime: any) => {
  let fee = Math.max(0, getDay(startTime) - free4BorrowDays);
  return fee
}

export const checkFeeLimit = async (username: string) => {
  const feeLimit = 10;
  let check = true;
  const { data } = await getBorrowedBookLists({ username });
  const booklists = data.result.map((item: any) => {
    item.startTime = item.startTime.substring(0, 10);
    item.fee = calculateFee(item.startTime);
    if (item.fee > feeLimit) {
      check = false;
    }
    return item;
  })
  console.log(check);
  return check;
}

export const loginAccount = (data: any) => {
  return baseInstance({
    url: "/Login",
    method: "post",
    data
  });
}