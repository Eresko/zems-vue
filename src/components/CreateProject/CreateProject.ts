import { computed,defineEmits,onMounted,reactive,watchEffect } from 'vue'
import { Notyf } from 'notyf'
import userApi from '/src/api/userApi'
import {searchText} from "../Project/Project";
const notyf = new Notyf()
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
export const option = reactive({name:"",description:""})


export const createProject = async ():void => {
    let obj:{} = {
        name: option.name,
        description: option.description
    }
    const { data, status } = await userApi.createProject(obj)
    if (status) {
        notyf.success('Проект' + option.name + "  успешно создан")
        window.location.replace("/")
    }
    else {
        notyf.error('Что то пошло не так')
    }
    console.log(data)


}


