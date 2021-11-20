<template>
  <h1>This is a restricted page</h1>
  <usersComponent />
  <button @click="logout" data-cy="logout">Logout</button>
</template>

<script lang="ts">
import usersComponent from "@/components/users.vue"
import { useRouter } from "vue-router"
import { inject } from "vue"
import { AxiosStatic } from "axios"

export default {
  components: {
    usersComponent
  },
  setup() {
    const axios: AxiosStatic | undefined = inject("axios")

    const router = useRouter()

    const logout = () => {
      (axios as AxiosStatic)
        .get("auth/logout")
        .then(() => {
          router.push("/")
        })
        .catch((error: Error) => {
          alert(error.message)
        })
    }

    return {
      logout
    }
  }
}
</script>
