<template>
  <div class="login">
    <input type="email" name="email" v-model="user.email" />
    <input type="password" name="password" v-model="user.password" />

    <button @click="login">Login</button>
  </div>
</template>

<script lang="ts">
import { reactive } from "@vue/reactivity"
import { useRouter } from "vue-router"
import { inject } from "vue"
import { AxiosStatic } from "axios"

export default {
  setup() {
    const axios: AxiosStatic | undefined = inject("axios")

    const router = useRouter()
    const user = reactive({
      email: "sean.maxwell@gmail.com",
      password: "Password@1"
    })

    const login = () => {
      (axios as AxiosStatic)
        .post("auth/login", user)
        .then(() => {
          router.push("restricted")
        })
        .catch((error: Error) => {
          alert(error.message)
        })
    }

    return {
      user,
      login
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
