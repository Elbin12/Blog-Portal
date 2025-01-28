import { axiosInstance } from "../../axios";

export const siginService = async(data) => {
    return await axiosInstance.post('admin/signin/', data);
}

export const usersService = async() => {
    return await axiosInstance.get('admin/users/');
};

export const userDetailService = async(id) => {
    return await axiosInstance.get(`admin/user/${id}`)
};

export const userBlockService = async(data) => {
    return await axiosInstance.post('admin/user/block/', data);
};