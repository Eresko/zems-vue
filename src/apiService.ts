import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    AxiosInstance,
    AxiosAdapter,
    Cancel,
    CancelToken,
    CancelTokenSource,
    Canceler,
} from 'axios'


let apiService: AxiosInstance = axios.create()

apiService.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

apiService.interceptors.request.use(
    (config: any) => {
        if (localStorage.getItem('token')) {
            config.headers['Authorization'] =
                'Bearer ' + localStorage.getItem('token')
        }
        return Promise.resolve(config)
    },
    (error: any) => {
        const { response } = error
        return {
            status: false,
            response: response,
            data: response?.data,
        }
    }
)
apiService.interceptors.response.use(
    (response: any) => {
        response.status = true
        return Promise.resolve(response)
    },
    (error: any) => {
        let { response } = error
        return {
            status: false,
            response: response,
            data: response?.data,
        }
    }
)



export default apiService