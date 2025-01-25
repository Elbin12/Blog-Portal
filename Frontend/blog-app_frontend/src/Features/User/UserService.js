import { axiosInstance } from "../../axios";


export const signupService = async(data) =>{
    return await axiosInstance.post('signup/', data)
}

export const singinService = async(data) => {
    return await axiosInstance.post('signin/', data)
}

export const profileUpdateService = async(data) => {
    return await axiosInstance.put('profile/update/', data);
}