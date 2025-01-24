import { axiosInstance } from "../../axios";

export const siginService = async(data) => {
    return await axiosInstance.post('admin/signin/', data);
}

export const usersService = async() => {
    return await axiosInstance.get('admin/users/');
}