<template>
  <el-input v-model="formData.searchISBN" placeholder="Input the ISBN of book to update" type="text" clearable>
    <template #append>
      <el-button :icon="Search" @click="searchBook" />
    </template>
  </el-input>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Book Information</span>
      </div>
    </template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize"
      status-icon>
      <el-form-item label="Book name" prop="book.name">
        <el-input v-model="ruleForm.book.name" />
      </el-form-item>
      <el-form-item label="Author" prop="book.author">
        <el-input v-model="ruleForm.book.author" />
      </el-form-item>
      <el-form-item label="ISBN" prop="book.ISBN" >
        <el-input v-model="ruleForm.book.ISBN" readonly/>
      </el-form-item>
      <el-form-item label="Book number" prop="book.resNumber">
        <el-select-v2 v-model="ruleForm.book.resNumber" placeholder="Book number" :options="options" />
      </el-form-item>

      <!--     <el-form-item label="Book label" prop="label">
      <el-checkbox-group v-model="ruleForm.label">
        <el-checkbox label="Online activities" name="label" />
        <el-checkbox label="Promotion activities" name="label" />
        <el-checkbox label="Offline activities" name="label" />
        <el-checkbox label="Simple brand exposure" name="label" />
      </el-checkbox-group>
    </el-form-item> -->

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Update
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
import { getBookByISBN, updateBook } from '@/api/modules/Staff';
import { success, error } from "@/api"

const formData = reactive({
  searchISBN: "",
})
const searchBook = async () => {
  const ISBN = formData.searchISBN;
  const { data } = await getBookByISBN({ISBN});
  console.log(data)
  if(data.result == false) {
    error("No this book");
  }
  else if(data.success) {
    ruleForm.book = data.result[0];
    console.log(ruleForm.book)
  } else {
    error("Network Error");
  }
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  book: {
    id: '',
    name: '',
    author: '',
    label: [],
    resNumber: '',
    ISBN: '',
  }
})

const rules = reactive<FormRules>({
  book: {
      name: [
        { required: true, message: 'Please input Book name', trigger: 'blur' },
        { min: 1, message: 'Length should be at least 1', trigger: 'blur' },
      ],
      author: [
        {
          required: true,
          message: 'Please input Author',
          trigger: 'change',
        },
      ],
      ISBN: [
        {
          required: true,
          message: 'Please input ISBN',
          trigger: 'change',
        },
      ],
      resNumber: [
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
    
  }

})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { data } = await updateBook(ruleForm.book);
      if (data.success) {
        success()
        resetForm(formEl);
        formData.searchISBN = "";
      } else {
        error("Network Error");
      }
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
