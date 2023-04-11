<template>
  <el-form :model="formData" ref="vForm" label-position="left" label-width="80px" size="default" @submit.prevent>
    <el-form-item label="input" label-width="150px" prop="Patron-search" class="label-center-align">
      <el-input v-model="formData.patronName" type="text" clearable>
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
            <template #default>
              <el-button link type="primary" size="small" @click="returnPatronBook">Return</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-card>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { Search } from '@element-plus/icons-vue'
import { getBorrowedBookLists } from '@/api/modules/Patron';
import { returnBook } from '@/api/modules/Staff';
import {success, error} from "@/api"



const formData = reactive({
  patronName: "",
  borrowedBookLists: []
})

const searchPatron = async() => {
  const { data } = await getBorrowedBookLists(formData.patronName);
  formData.borrowedBookLists = [...data.bookLists];
}

const returnPatronBook = async(book: any) => {
  const { data } = await returnBook(book);
  console.log(data)
  if(data.success) {
        success()
      } else {
        error();
      }
  
}

</script>

<style lang="scss" scoped>
.el-descriptions__label {
  width: 20px;
}
</style>