import userApi from '/src/api/userApi'
export const checkUser = async () =>{
    const { data, status } = await userApi.checkUser()
    return status
}

