<template>
  <el-form :model="formData" ref="vForm" label-position="left" label-width="80px" size="default" @submit.prevent>
    <el-form-item label="input" label-width="150px" prop="Patron-search" class="label-center-align">
      <el-input v-model="formData.patronName" placeholder="Please input the patron name" type="text" clearable>
        <template #append>
          <el-button :icon="Search" @click="searchPatron"/>
        </template>
      </el-input>
    </el-form-item>
    <div class="card-container">
      <el-card style="{width: 100% !important}" shadow="always">
        <template #header>
          <div class="clear-fix">
            <span>Patron's Information</span>
          </div>
        </template>
        <el-form-item label="Patron Name" label-width="150px" prop="input55879" class="label-center-align">
          <el-input v-model="formData.patronName" type="text" readonly="true" clearable></el-input>
        </el-form-item>
        <el-table :data="formData.borrowedBookLists" style="width: 100%">
          <el-table-column fixed prop="ISBN" label="ISBN" width="150" />
          <el-table-column prop="id" label="ID" width="150" />
          <el-table-column prop="name" label="Name" width="120" />
          <el-table-column prop="author" label="Author" width="120" />
          <el-table-column prop="startTime" label="StartTime" width="120" />
          <el-table-column prop="fee" label="Fee" width="120" />
          <el-table-column fixed="right" label="Operations" width="120">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="returnPatronBook(scope.row)">Return</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-card>
    </div>
  </el-form>
  <el-dialog v-model="QR.QRVisible" :title="'Scan the QR to pay $' + QR.fee" width="30%" :before-close="QRClose" center="true">
    <qrcode-vue :value="QR.QRcode" :size="200"></qrcode-vue>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="QRClose">Cancel</el-button>
        <el-button type="primary" @click="QRConfirm">
          I have paid off
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { Search } from '@element-plus/icons-vue'
import { getBorrowedBookLists } from '@/api/modules/Patron';
import { returnBook, confirmPay } from '@/api/modules/Staff';
import {success, error} from "@/api"
import { caculateFee } from '@/api'
import qrcodeVue from "qrcode.vue"
import { useStore } from 'vuex';
const store = useStore();

const formData = reactive({
  patronName: "",
  borrowedBookLists: ""
})
const QR = reactive({
  QRVisible: false,
  data: "",
  fee: "",
  QRcode: "",

})
const QRClose = () => {
  QR.QRVisible = false;
  error("Fail to return");
}
const QRConfirm = async () => {
  let { data } = await confirmPay(QR.data);
  if (data.success) {
    const { data } = await returnBook(QR.data);
    console.log(data)
    if (data.success) {
      success()
      QR.QRVisible = false;
      searchPatron()
    } else {
      error("Network Error");
    }
  }
  else {
    error("You haven't pay the fee")
  }
}

const searchPatron = async() => {
  const username = formData.patronName
  const { data } = await getBorrowedBookLists({username});
  if(data.result == false) {
    error("No this patron");
    return ;
  }
  console.log(data)
  const booklists = data.result.map((item: any) => {
    item.startTime = item.startTime.substring(0, 10);
    console.log(item.startTime)
    item.fee = caculateFee(item.startTime);
    item.activeUser = store.state.username;
    return item;
  })
  formData.borrowedBookLists = [...booklists];
}

const returnPatronBook = async(book: any) => {
      console.log(caculateFee(book.startTime))
      if (caculateFee(book.startTime) == 0) {
        const { data } = await returnBook(book);
        if (data.success) {
          await searchPatron()
          success()
          
        } else {
          error("Network Error");
        }
        return;
      }
      else {
        (QR.fee as any) = caculateFee(book.startTime);
        (QR.data as any) = book;
        QR.QRcode = JSON.stringify(book);
        QR.QRVisible = true;
      }
  
}

</script>

<style lang="scss" scoped>
.el-descriptions__label {
  width: 20px;
}
\deep\.dialog {
  background-color: pink;
}
.QR {
  margin: 0 auto;
}
</style>