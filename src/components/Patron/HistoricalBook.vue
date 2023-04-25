<template>
  <div class="book-search-page">
<!--     <div class="cover-img"></div> -->
<!--     <div class="Book-search-input">
      <el-input v-model="searchInput.content" size="large" placeholder="Please input" class="input-with-select">
        <template #prepend>
          <el-select v-model="searchInput.label" size="large" placeholder="Select" style="width: 115px">
            <el-option label="Author" value="1" />
            <el-option label="Book" value="2" />
            <el-option label="Type" value="3" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="search"/>
        </template>
      </el-input>
    </div> -->

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

  
                <!-- <div>ResNumber: {{ book.resNumber }}</div>
                <div>StartTIme: {{ book.startTime }}</div>
                <div>Fee: {{ book.fee }}</div>
              <div class="bottom">
                <el-button text class="button">Operating</el-button>
              </div> -->
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { reactive, onMounted } from 'vue';
import { getHistoryBookLists } from '@/api/modules/Patron';
import { useStore } from 'vuex'
import { caculateFee } from '@/api'

const store = useStore();

const searchInput = reactive({
  activeUser: store.state.username,
  content: '',
  label: '',
})

const results: any = reactive({
  bookLists: Array,

})

const search = async() => {
  //const res = await getBookLists();
  //results.bookLists = res.data;
}

onMounted(async () => {
  const username = store.state.username;
  const { data } = await getHistoryBookLists({username});
  console.log(data)
  const booklists = data.result.map((item: any) => {
    //item.startTime = item.startTime.substring(0, 10);
    console.log(item.startTime)
    //item.fee = caculateFee(item.startTime);
    return item;
  })
  results.bookLists = [...booklists];
  
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
      justify-content: space-between;
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
