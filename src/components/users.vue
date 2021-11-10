<template>
    {{ users }}
</template>

<script lang="ts">
import { reactive } from '@vue/reactivity';
import { inject } from 'vue';

export default {
    setup() {
        const axios: any = inject('axios');

        const users: object[] = reactive([])

        axios.get('http://localhost:3000/api/users/all')
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
