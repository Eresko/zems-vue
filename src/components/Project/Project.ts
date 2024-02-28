import  { ref,watchEffect,onMounted,reactive,computed } from 'vue'
import { Notyf } from 'notyf'
import {loginRequest} from "../Login/Input";
import userApi from '/src/api/userApi'
const notyf = new Notyf()
export const filters = ref({
    current_page: 1,
    per_page: 10,
    total: 0,
    last_page: 0,
    data: []
})
export const searchText = ref("");
export const page = reactive({current: 1,old:1})
export const getProject = async ():Promise<void> => {
    let pages = page.current
    const { data, status } = await userApi.getProject({page:pages,search:searchText.value})
    if (status) {
        filters.value.data = data.result.data
        filters.value.current_page = data.result.currentPage
        filters.value.per_page = data.result.perPage
        filters.value.total = data.result.total
        filters.value.last_page = data.result.lastPage
        notyf.success('Обновлен список проектов')
    }
}