<template>
  <el-form :model="formData" ref="vForm" label-position="left" label-width="80px" size="default" @submit.prevent>
    <el-form-item label="input" label-width="150px" prop="Patron-search" class="label-center-align">
      <el-input v-model="formData.searchId" type="text" clearable>
        <template #append>
          <el-button :icon="Search" />
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
        <el-form-item label="Patron ID" label-width="150px" prop="input99773" class="label-center-align">
          <el-input v-model="formData.patronId" type="text" readonly="true" clearable></el-input>
        </el-form-item>
        <el-form-item v-for="(book, index) in formData.borrowedBookLists" :key="book.id">
          <el-descriptions :title="'BorrowedBook ' + (index + 1)" :column="3" :size="size" border>
            <template #extra>
              <el-button type="primary">Return</el-button>
            </template>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  BookName
                </div>
              </template>
              {{ book.bookName }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  BookID
                </div>
              </template>
              {{ book.id }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  Fee
                </div>
              </template>
              {{ book.fee }}
            </el-descriptions-item>
          </el-descriptions>

        </el-form-item>
      </el-card>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { Search } from '@element-plus/icons-vue'
const formData = reactive({
  searchId: "",
  patronName: "",
  patronId: "",
  borrowedBookLists: [{ bookName: '你好', id: '1', fee: 20 },{ bookName: '你好', id: '1', fee: 20 }]
})

</script>

<style lang="scss" scoped>
.el-descriptions__label {
  width: 20px;
}
</style>