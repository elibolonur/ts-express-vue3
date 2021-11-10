<template>
    <div class="login">
        <input type="email" name="email" v-model="user.email">
        <input type="password" name="password" v-model="user.password">

        <button v-on:click="login">Login</button>
    </div>
</template>

<script lang="ts">
import { reactive } from '@vue/reactivity'
import { useRouter } from 'vue-router';
import { inject } from 'vue';

export default {
    setup() {
        const axios: any = inject('axios');
        
        const router = useRouter();
        const user = reactive({
            email  : 'sean.maxwell@gmail.com',
            password: 'Password@1'
        });

        const login = () => {
            axios.post('http://localhost:3000/api/auth/login', user)
                .then((error : any) => {
                    router.push('restricted');
                }).catch((error : any) => {
                    alert(error.message);
                });
        }

        return {
            user,
            login
        }
    },
}
</script>

<style lang="scss" scoped>
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>