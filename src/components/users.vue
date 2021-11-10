<template>
    <div v-for="user in users" :key=user.id class="user">
        <p>{{user.name}}</p>
        <p>{{user.email}}</p>
        <p>{{user.role}}</p>
    </div>
</template>

<script lang="ts">
import { reactive } from '@vue/reactivity';
import { inject } from 'vue';

export default {
    setup() {
        const axios: any = inject('axios');

        const users: object[] = reactive([])
       
        axios.get('users/all')
            .then((response : {data: {users: []}}) => {
                users.push.apply(users, response.data.users);
            }).catch((error : any) => {
                alert(error.message);
            });

        return {
            users
        }
    },
}
</script>

<style lang="scss" scoped>
.user {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}
</style>