export const token = ():string => {
    return localStorage.getItem('token')
}