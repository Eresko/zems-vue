import  { ref,watchEffect,onMounted,reactive,computed } from 'vue'
import { Notyf } from 'notyf'
import {loginRequest} from "../Login/Input";
import userApi from '/src/api/userApi'
import {projectId, searchText} from "../Task/Task";
import {option} from "../CreateTask/CreateTask";
const notyf = new Notyf()


export const params = reactive({projectName:"",projectId:0,taskName:"",taskId:0})
export const task = ref({});

export const getTaskCurrent = async (id:number):Promise<void> => {
    const { data, status } = await userApi.getTaskCurrent({id:id})
    if (status) {
        task.value = data.result
    }

}

export const createTimestamp = async (watch:number):Promise<void> => {
    let obj:{} = {
        task_id:parseInt(params.taskId),
        watch:watch
    }
    const { data,status } = await userApi.createTimestamp(obj)
    if (status) {
        window.location.replace("/task?id=" + params.projectId + "&name=" + params.projectName)
    }
}

