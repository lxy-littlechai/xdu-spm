<template>
  <el-input v-model="formData.searchId" type="text" clearable>
        <template #append>
          <el-button :icon="Search" />
        </template>
      </el-input>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Book Information</span>
      </div>
    </template>
    <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="Book name" prop="name">
      <el-input readonly v-model="ruleForm.bookName" />
    </el-form-item>
    <el-form-item label="Author" prop="Author">
      <el-input readonly v-model="ruleForm.author" />
    </el-form-item>
    <el-form-item readonly label="Book number" prop="number">
      <el-select-v2
        v-model="ruleForm.number"
        placeholder="Book number"
        :options="options"
      />
    </el-form-item>

    <el-form-item readonly label="Book label" prop="label">
      <el-checkbox-group v-model="ruleForm.label">
        <el-checkbox label="Online activities" name="label" />
        <el-checkbox label="Promotion activities" name="label" />
        <el-checkbox label="Offline activities" name="label" />
        <el-checkbox label="Simple brand exposure" name="label" />
      </el-checkbox-group>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Delete
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
  </el-card>
  
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
const formData = reactive({
  searchId: "Input the id of book to delete",
  bookName: "",
  author: "",
  number: "",
  label: [],
  borrowedBookLists: [{ bookName: '你好', id: '1', fee: 20 },{ bookName: '你好', id: '1', fee: 20 }]
})

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  bookName: 'Hello',
  author: '',
  number: '',
  label: [],
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input Book name', trigger: 'blur' },
    { min: 1,  message: 'Length should be at least 1', trigger: 'blur' },
  ],
  Author: [
    {
      required: true,
      message: 'Please input Author',
      trigger: 'change',
    },
  ],
  number: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  label: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  margin-top: 30px;
}
</style>
