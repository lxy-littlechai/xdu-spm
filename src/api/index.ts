export * from "./instance"
export * from "./modules"

import { ElMessage } from 'element-plus'

export const success = () => ElMessage({
  showClose: true,
  message: 'success',
  type: 'success',
})

export const error = () => ElMessage({
  showClose: true,
  message: 'error',
  type: 'error',
})