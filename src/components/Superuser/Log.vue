<template>
  <el-table :data="log.msg" stripe style="width: 100%">
    <el-table-column prop="id" label="Id" width="80" />
    <el-table-column prop="permission" label="Permission" width="100" />
    <el-table-column prop="user" label="User" />
    <el-table-column prop="event" label="event" />
    <el-table-column prop="user" label="User" />
    <el-table-column prop="content" label="Content" />
    <el-table-column prop="time" label="Time" />
  </el-table>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { getSystemLog }  from "@/api/modules/Superuser"


const log = reactive({
  msg: []
  
})

onMounted(async () => {
  console.log('qwq')
  const { data }= await getSystemLog();
  console.log(data)
  log.msg = data.result;
})

</script>