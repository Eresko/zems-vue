import { reactive,ref } from 'vue'
import userApi from '/src/api/userApi'
import {loginRequest} from "../Login/Input";
export const option = reactive({password:"",confirmation:""})


export const changePassword = async ():Promise<any> => {
    let obj:{} = {
        password:option.password,
    }
    const { data, status } = await userApi.changePassword(obj)
    if (status) {
        window.location.replace("/")
    }
}