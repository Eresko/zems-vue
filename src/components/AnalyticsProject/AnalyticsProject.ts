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
    charts: [],
    data: []
})

export const impressionsPlatformChart = reactive({ date: [1, 1, 1] })
export const searchText = ref("");
export const page = reactive({current: 1,old:1})
export const getProject = async ():Promise<void> => {
    let pages = page.current
    const { data, status } = await userApi.analyticsProject({page:pages,search:searchText.value})
    if (status) {
        filters.value.data = data.result.data
        filters.value.data.forEach( (item) => {
           let res = optionsGame();
           filters.value.charts.push(optionsGameItems(item.user_watch,res))

        })
        filters.value.current_page = data.result.currentPage
        filters.value.per_page = data.result.perPage
        filters.value.total = data.result.total
        filters.value.last_page = data.result.lastPage
        notyf.success('Обновлена список аналитики проектов')
    }

}

const optionsGameItems = (impressionsGames, optionsGame) => {
    const colors = []
    const labels = []
    const series = []
    impressionsGames.forEach((item) => {
        colors.push(item.color)
        labels.push(item.name)
        series.push(item.count)
    })
    optionsGame.colors = colors
    optionsGame.labels = labels
    optionsGame.legend.colors = colors
    optionsGame.series = series
    return optionsGame
}

const optionsGame = () => {
    return {
        title: {
            text: 'Часы по пользователям',
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#fff',
            },
        },
        chart: {
            height: '250',
            type: 'donut',
        },
        labels: ['Rust', 'Just Chatting', 'League of Legends'],
        colors: ['#295495', '#d995ea', '#c57f3d'],
        fill: {
            pattern: {
                style: 'verticalLines',
                width: 6,
                height: 6,
                strokeWidth: 2,
            },
        },
        responsive: [
            {
                breakpoint: 300,
                options: {
                    chart: {
                        width: 100,
                        toolbar: {
                            show: false,
                        },
                    },
                    legend: {
                        position: 'left',
                    },
                },
            },
        ],
        legend: {
            position: 'left',
            horizontalAlign: 'left',
            labels: {
                colors: ['#a5a5a5', '#a5a5a5', '#a5a5a5'],
            },
        },
    }
}
