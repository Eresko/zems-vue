import { computed,defineEmits,onMounted,reactive,watchEffect } from 'vue'
import { Notyf } from 'notyf'
import userApi from '/src/api/userApi'
import {searchText} from "../Project/Project";
const notyf = new Notyf()
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
export const option = reactive({name:"",description:"",id:0})


export const createTask = async (id:number):void => {
    let obj:{} = {
        name: option.name,
        description: option.description,
        project_id: parseInt(id)
    }
    const { data, status } = await userApi.createTask(obj)
    if (status) {
        notyf.success('Задача проекта ' + option.name + "  успешно создана")
        window.location.replace("/task?id=" + id + "&name=" + option.name)
    }
    else {
        notyf.error('Что то пошло не так')
    }
    console.log(data)


}