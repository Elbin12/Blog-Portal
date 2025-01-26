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

export const imageUploadService = async(data) => {
    return await axiosInstance.put('profile/update/', data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const createBlogService = async(data) => {
    return await axiosInstance.post('blog/create-list/', data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const blogListingService = async(data) => {
    return await axiosInstance.get('blog/create-list/')
}