<template>
  <div v-for="user in users" :key="user.id" class="user">
    <p>{{ user.name }}</p>
    <p>{{ user.email }}</p>
    <p>{{ user.role }}</p>
  </div>
</template>

<script lang="ts">
import { reactive } from "@vue/reactivity"
import { inject } from "vue"
import { AxiosStatic } from "axios"

export default {
  setup() {
    const axios: AxiosStatic | undefined = inject("axios")

    const users = reactive([]);
    
    (axios as AxiosStatic)
      .get("users/all")
      .then((response: { data: { users: [] } }) => {
        users.push(...response.data.users)
      })
      .catch((error: Error) => {
        alert(error.message)
      })

    return {
      users
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
