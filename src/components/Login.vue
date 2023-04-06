<template>
  <div class="login-container">
    <h1 class="login-title">Library Login</h1>
    <form class="login-form">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="state.username" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="state.password" required>
      </div>
      <div class="form-group">
        <label for="role">Role</label>
        <select id="role" v-model="state.role" required>
          <option value="" disabled>Select your role</option>
          <option value="Patron">Patron</option>
          <option value="Administrator">Administrator</option>
          <option value="Staff">Staff</option>
          <option value="Superuser">Superuser</option>
        </select>      </div>
      <button type="submit" class="login-button" @click.prevent="login">Login</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from "vue-router"

const router = useRouter();

const state = reactive({
  username: '',
  password: '',
  role: ''
})

const login = () => {
  // TODO: Implement login functionality
  switch (state.role) {
    case 'Patron': 
      router.push({
        path: '/Patron',
      })
      break;
    case 'Staff':
      router.push({
        path: '/Staff',
      })
      break;
    default:
      break;
  }
  console.log('Logged in as', state.role, 'with username', state.username, 'and password', state.password)
}

</script>
<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-title {
  font-size: 3rem;
  margin-bottom: 2rem;
  font-family: Arial, sans-serif;
  color: #333;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30rem;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: #fff;
}

.form-group {
  width: 20rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  align-items: flex-start; /* Add this line to align items to the left */
}

label {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-family: Arial, sans-serif;
  color: #333;
  width: 100%; /* Add this line to make the label take up the full width */
  display: inline-block; /* Add this line to make the label inline with the input/select */
}
input[type="text"],
input[type="password"],
select {
  padding: 0.5rem;
  font-size: 1.5rem;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  width: 100%;
}

.login-button {
  margin-top: 2rem;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-family: Arial, sans-serif;
}
</style>
