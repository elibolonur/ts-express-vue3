<template>
    <h1>This is a restricted page</h1>
    <usersComponent />
    <button v-on:click="logout">Logout</button>
</template>

<script lang="ts">
import usersComponent from "@/components/users.vue"
import axios from 'axios';
import { useRouter } from 'vue-router';
axios.defaults.withCredentials = true;

export default {
  components: {
    usersComponent,
  },
  setup () {
      const router = useRouter();

      const logout = () => {
          axios.get('http://localhost:3000/api/auth/logout')
            .then(response => {
                router.push('/')
            }).catch(error => {
                alert(error.message);
            });
      }

      return {
          logout
      }
  }
}
</script>