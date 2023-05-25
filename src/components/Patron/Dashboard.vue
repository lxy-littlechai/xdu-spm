<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>Hello {{ dashboard.username }} !</span>
      </div>
    </template>
    <div class="flex">
      <div>Books on loan: <strong>{{ dashboard.borrowedBooks.length }}</strong></div>
      <div>Books in History: <strong>{{ dashboard.historyBorrowedBooks.length }}</strong></div>
      <div>Fee: <strong>{{ dashboard.fee }}</strong></div>
    </div>
    
    
  </el-card>
  <el-card style="margin-top: 30px;">
    <template #header>
      <div class="card-header">
        <span>Recommend Books</span>
      </div>
    </template>
    <div class="container">
      <div v-for="book in dashboard.recomendBooks" :key="book.ISBN">
        <book-card 
          @clickBtn="addToLists"
          btnName="add to lists"
          :img="book.img"
          :name="book.name"
          :author="book.author"
          :location="book.location"
          :ISBN="book.ISBN"
        ></book-card>
      </div>
    </div>
  </el-card>
  
</template>

<script lang="ts" setup>
import { reactive, onMounted } from "vue"
import { useStore } from "vuex"
import { getBookLists, getBorrowedBookLists, getHistoryBookLists } from "@/api/modules/Patron"
import { calculateFee ,success, error } from "@/api"
import bookCard from "@/components/Public/bookCard.vue";


const store = useStore();
const dashboard = reactive({
  username: store.state.username,
  booklists: Array<unknown>(),
  borrowedBooks: Array<unknown>(),
  historyBorrowedBooks: Array<unknown>(),
  recomendBooks: Array<unknown>(),
  fee: 0,
})

const addToLists = (book: any) => {
  console.log(book.ISBN, store.state.shopLists)
  const flag = store.state.shopLists.some((item: any) => {
    return item.ISBN == book.ISBN
  });
  console.log(flag)
  if(flag == false) {
    store.commit('addToLists', book)
    success('success');
  }else {
    error('You have added the same book')
  }
}

onMounted(async () => {
  let  res  = await getBorrowedBookLists({username: dashboard.username})
  dashboard.borrowedBooks = res.data.result

  res  = await getBookLists({
    activeUser: dashboard.username,
    content: '',
    label: ''
  });
  dashboard.booklists = res.data.result
  console.log(res.data)

  res = await getHistoryBookLists({username: dashboard.username})
  dashboard.historyBorrowedBooks = res.data.result

  dashboard.borrowedBooks.map((book: any)=> {
    dashboard.fee += book.fee
    console.log('fee', book.fee)
  }) 

  const rand = Math.floor(Math.random()%dashboard.booklists.length);
  for(let i = rand, j = 1;j <= 5;j ++) {
    dashboard.recomendBooks.push(dashboard.booklists[i]);
    i ++;
    i %= dashboard.booklists.length;
    if(i == rand) break;
  }

  

})
</script>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
  &>div {
    margin: 0 20px;
  }
}
</style>