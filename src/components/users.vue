<template>
    {{ users }}
</template>

<script lang="ts">
import axios from 'axios';
import { reactive } from '@vue/reactivity';
axios.defaults.withCredentials = true;

export default {
    setup() {
        const users: object[] = reactive([])

        axios.get('http://localhost:3000/api/users/all')
            .then(response => {
                users.push.apply(users, response.data.users);
            }).catch(error => {
                alert(error.message);
            });

        return {
            users
        }
    },
}
</script>
