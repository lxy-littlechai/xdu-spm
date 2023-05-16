<template>
  <div class="book-search-page">
<!--     <div class="cover-img"></div> -->
    <div class="Book-search-input">
      <el-input readonly v-model="searchInput.content" size="large" placeholder="Click the button to borrow following books " class="input-with-select">
        
        <template #append>
          <el-button :icon="Check" @click="borrowLists"/>
        </template>
      </el-input>
    </div>

    <div class="book-results">
      <el-row justify="start" gutter="25">
        <el-col
          v-for="book in results.bookLists"
          :key="book.id"
          :span="4"
          :offset="1"
        >
          <el-card style="width: 220px; height: 300px; border-radius: 8px; border: 0px;" :body-style="{ border: '0px',padding: '0px' }" shadow="hover">
            <img :src="book.img"
              class="image" />
            <div style="padding: 14px">

                <div>BookName: {{book.name}}</div>
                <div>Author: {{book.author}}</div>

  <!--               <div>Label: {{ book.label }}</div> -->
                <div>ResNumber: {{ book.resNumber }}</div>
              <div class="bottom">
                <el-button type="text" class="button" @click="deleteFromLists(book)">Delete</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { Check } from '@element-plus/icons-vue'
import { reactive, onMounted, TrackOpTypes } from 'vue';
import { getBorrowedBookLists } from '@/api/modules/Patron';
import { borrowBook } from '@/api/modules/Staff';
import { useStore } from 'vuex'
import { caculateFee } from '@/api'
import { success, error, getNowFormatDate } from "@/api"

const store = useStore();

const searchInput = reactive({
  activeUser: store.state.username,
  content: '',
  label: '',
})

const results: any = reactive({
  bookLists: Array,

})

const borrowLists = async () => {
  const name = store.state.username;
  const { data } = await getBorrowedBookLists({username: name});
  if(data.result.length + results.bookLists.length > 5) {
    error("The max borrowed limits is 5");
    return ;
  }
  
  console.log(store.state.username)


  let flag = true;
  for(const book of store.state.shopLists) {
    const body = Object.assign(book, {name: name, startTime: getNowFormatDate()})
    
    const { data } = await borrowBook(body);
    if (!data.success) {
      flag = false;
    }
    console.log(data)
  }
  if(flag) success('success');
  else {
    error("Network Error");
  }
  store.commit('clearLists');
  results.bookLists = store.state.shopLists;
}

const deleteFromLists = (book:any) => {
  store.commit('deleteFromLists', book);
}

onMounted(async () => {
  results.bookLists = store.state.shopLists;
  
})


</script>

<style lang="scss" scoped>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}

.book-search-page {
  position: relative;
  width: 100%;
  height: auto;
  padding-top: 100px;

  .cover-img {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(https://s.cn.bing.net/th?id=OHR.QingMing2023_ZH-CN6951199028_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&qlt=50);

    background-image: url(https://s.cn.bing.net/th?id=OHR.QingMing2023_ZH-CN6951199028_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&qlt=50);
    background-size: cover;
    background-repeat: no-repeat;
  }

  .Book-search-input {
    width: 40%;
    height: auto;
    padding: 10rem 0;
    margin: 0rem auto;
  }

  .book-results {
    .el-row {
      margin-bottom: 20px;
    }

    .el-row:last-child {
      margin-bottom: 0;
    }

    .el-col {
      width: 25%;
      border-radius: 4px;
      margin-bottom: 30px;
    }
    .el-col-4 {
      max-width: 15%;
    }

    .time {
      font-size: 12px;
      color: #999;
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
      display: flex;
      justify-content: right;
      align-items: center;
    }

    .button {
      padding: 0;
      min-height: auto;
    }

    .image {
      width: 100%;
      height: 150px;
      display: block;
    }


  }
}</style>
