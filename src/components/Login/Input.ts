import { reactive,ref } from 'vue'
import userApi from '/src/api/userApi'
export const option = reactive({login:"",password:"",name: ""})
export const isRegActive = ref(false);




export const registrationRequest = async ():Promise<any> =>{
    let obj:{} = {
        name:option.name,
        password:option.password,
        email:option.login

    }
    const { data, status } = await userApi.registration(obj)
    if (status) {
        await loginRequest()
    }
    return status
}

export const loginRequest = async ():Promise<any> => {
    let obj: {} = {
        password: option.password,
        email: option.login
    }
    const {data, status} = await userApi.login(obj)
    if (status) {
        localStorage.setItem('token',data.result)
        window.location.replace("/")
    }
}