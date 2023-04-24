<template>
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
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="Author" prop="author">
      <el-input v-model="ruleForm.author" />
    </el-form-item>
    <el-form-item label="ISBN" prop="ISBN">
      <el-input v-model="ruleForm.ISBN" />
    </el-form-item>
    <el-form-item label="Book number" prop="resNumber">
      <el-select-v2
        v-model="ruleForm.resNumber"
        placeholder="Book number"
        :options="options"
      />
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
      <UploadImg ref="upload" @getImgURL="getImgURL"></UploadImg>
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Add new books
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
  </el-card>
  
</template>

<script lang="ts" setup>
import { defineComponent, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { addBook } from '@/api/modules/Staff';
import {success, error} from "@/api"
import UploadImg from "@/components/Public/upload.vue"
import { useStore } from 'vuex';
const store = useStore();

defineComponent ({
  components: {
    UploadImg
  }
})

const upload = ref(null);
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  activeUser: store.state.username,
  id: '',
  name: '',
  author: '',
  label: [],
  resNumber: '',
  ISBN: '',
  img: '',
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input Book name', trigger: 'change' },
    { min: 1,  message: 'Length should be at least 1', trigger: 'change' },
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
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log(ruleForm.img)
      const { data } = await addBook(ruleForm);
      if(data.success) {
        success()
        resetForm(formEl);
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
  upload.value.clearFiles();

}

const getImgURL = (url: string) => {
  ruleForm.img = url;
  console.log('get', url)
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
</style>
