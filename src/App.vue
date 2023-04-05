<template>
  <BookSearch />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Login from "./components/Login.vue";
import BookSearch from "@/components/Patron/Book-search.vue";

@Options({
  components: {
    Login,
    BookSearch
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">

</style>
