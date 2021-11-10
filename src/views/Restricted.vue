<template>
    <h1>This is a restricted page</h1>
    <usersComponent />
    <button v-on:click="logout">Logout</button>
</template>

<script lang="ts">
import usersComponent from "@/components/users.vue"
import { useRouter } from 'vue-router';
import { inject } from 'vue';

export default {
  components: {
    usersComponent,
  },
  setup () {
      const axios: any = inject('axios');
      
      const router = useRouter();

      const logout = () => {
          axios.get('auth/logout')
            .then((response : any) => {
                router.push('/')
            }).catch((error : any) => {
                alert(error.message);
            });
      }

      return {
          logout
      }
  }
}
</script>