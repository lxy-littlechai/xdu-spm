<template>
  <el-input v-model="formData.name" placeholder="Input the username" type="text" clearable>
  </el-input>
  <el-input v-model="formData.searchISBN" placeholder="Input the ISBN of book to borrow" type="text" clearable>
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
      <el-form-item label="Book name" prop="book.name" >
        <el-input v-model="ruleForm.book.name" readonly />
      </el-form-item>
      <el-form-item label="Author" prop="book.author" >
        <el-input v-model="ruleForm.book.author" readonly/>
      </el-form-item>
      <el-form-item label="ISBN" prop="book.ISBN" >
        <el-input v-model="ruleForm.book.ISBN" readonly/>
      </el-form-item>
      <el-form-item label="Book number" prop="book.resNumber" >
        <el-input v-model="ruleForm.book.resNumber" readonly/>
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
          Borrow
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
import { getBookByISBN, borrowBook } from '@/api/modules/Staff';
import { getBorrowedBookLists } from '@/api/modules/Patron';
import { success, error, getNowFormatDate } from "@/api"
import { caculateFee } from '@/api'
import { useStore } from 'vuex';
const store = useStore();

const formData = reactive({
  activeUser: store.state.username,
  name: "",
  searchISBN: "",
})
const checkFeeLimit = async() => {
  const feeLimit = 10;
  let check = true;
  const username = formData.name;
  const { data } = await getBorrowedBookLists({username});
  const booklists = data.result.map((item: any) => {
    item.startTime = item.startTime.substring(0, 10);
    item.fee = caculateFee(item.startTime);
    if(item.fee > feeLimit) {
      check = false;
    }
    return item;
  })
  console.log(check);
  return check;
}

const searchBook = async () => {
  const ISBN = formData.searchISBN
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
    activeUser: store.state.username,
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

const clear = (formEl: FormInstance | undefined) => {
  resetForm(formEl);
  formData.name = "";
  formData.searchISBN = "";
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    let checkFeeResult = await checkFeeLimit();
    if(Number(ruleForm.book.resNumber) <= 0) checkFeeResult = false;
    if(checkFeeResult == false) {
      clear(formEl)
      error("This patron has a fee to pay off")
      return ;
    }

    if (valid) {
      const body = Object.assign(ruleForm.book, {name: formData.name, startTime: getNowFormatDate()})
      console.log(body)
      const { data } = await borrowBook(body);
      if (data.success) {
        success()
        clear(formEl)
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
