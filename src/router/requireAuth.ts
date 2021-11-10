import axios from 'axios'

export const requireAuth = async (_to: any, _from: any, next: any) => {
    await axios.get('auth/check')
        .then((response : any) => {
            next();
        }).catch((error : any) => {
            next('/');
        });
}