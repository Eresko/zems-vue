import apiSerivce from '/src/apiService'

class UserApi {
    checkUser(): Promise<any> {
        return apiSerivce.get('/user/check')
    }
    registration(params: any): Promise<any> {
        return apiSerivce.post(`/user/registration`, params)
    }

    login(params: any): Promise<any> {
        return apiSerivce.post(`/user/login`, params)
    }
    getProject(params: any): Promise<any> {
        return apiSerivce.get(`/project`, {params})
    }
    getTask(params: any): Promise<any> {
        return apiSerivce.get(`/task/${params.id}`, {params})
    }
    createProject(params: any): Promise<any> {
        return apiSerivce.post(`/project`, params)
    }
    createTask(params: any): Promise<any> {
        return apiSerivce.post(`/task`, params)
    }
    getUsers(params: any): Promise<any> {
        return apiSerivce.get(`/user`, {params})
    }
    getTaskCurrent(params: any): Promise<any> {
        return apiSerivce.get(`/task/get/${params.id}`, {params})
    }
    createTimestamp(params: any): Promise<any> {
        return apiSerivce.post(`/task/timestamp`, params)
    }

    analyticsProject(params: any): Promise<any> {
        return apiSerivce.get(`/project-analytics`, {params})
    }

    changePassword(params: any): Promise<any> {
        return apiSerivce.post(`/user/change-password`, params)
    }

}
export default new UserApi()