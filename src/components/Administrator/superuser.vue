<template>
  <el-input v-model="formData.searchId" type="text" clearable>
    <template #append>
      <el-button :icon="Search" @click="FilterEmail" />
    </template>
  </el-input>
  <el-table :data="tableData.tableData" style="width: 100%">
    <el-table-column label="Email" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.Email }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Name" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.Name }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Permission" width="180" :filters="[
      { text: 'Patron', value: 'Patron' },
      { text: 'Staff', value: 'Staff' },
    ]" :filter-method="filterTag" filter-placement="bottom-end">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto" disabled>
          <template #reference>
            <el-tag>{{ scope.row.permission }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="Operations">
      <template #default="scope">
        <el-select v-model="scope.row.permission" class="m-2" placeholder="Select" size="large">
          <el-option v-for="item in options" :key="item" :label="item" :value="item" />
        </el-select>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :total="1000" />
</template>
 
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { Timer } from '@element-plus/icons-vue'

const formData = reactive({
  searchId: ""
})
const options = ["Patron", "Administrator", "Staff"]

interface User {
  Name: string
  Email: string
  permission: string
  address: string
}

const handleEdit = (index: number, row: User) => {
  if (row.permission == 'Patron') row.permission = 'Staff';
  else row.permission = 'Patron';
  console.log(index, row)
}
const tableData = reactive({
  tableData: [
    {
      Name: '1',
      Email: '2016-05-03',
      permission: 'Patron',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      Name: '2',
      Email: '2016-05-02',
      permission: 'Patron',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      Name: '3',
      Email: '2016-05-04',
      permission: 'Administrator',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      Name: '4',
      Email: '2016-05-01',
      permission: 'Administrator',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ]
})

const FilterEmail = () => {
  const data: User[] = tableData.tableData.filter((item) => {
    if (item.Email == formData.searchId) {
      return item;
    }

  })
  tableData.tableData = [...data];
  console.log(tableData)
}

const filterTag = (value: string, row: User) => {
  return row.permission === value
}
</script>