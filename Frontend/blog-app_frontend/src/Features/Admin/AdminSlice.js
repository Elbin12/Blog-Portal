import { createSlice } from "@reduxjs/toolkit"
import { signin, users } from "./AdminActions";

const accessToken = localStorage.getItem('AccessToken');
const refreshToken = localStorage.getItem('RefreshToken');
const adminDetails = JSON.parse(localStorage.getItem('adminDetails'));


const initialState = {
    adminDetails : adminDetails ? adminDetails : null,
    users : null,
    accessToken : accessToken? accessToken : null,
    refreshToken : refreshToken? refreshToken : null,
    loading : false,
    success : false,
    error : '',
    message : '',
}

const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        resetAll:(state)=>{
            state.adminDetails = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.loading = false;
            state.success = false;
            state.message = '';
            state.error = '';
        },
        setAdminDetails: (state, action)=>{
            state.adminDetails = action.payload;
        }
    },
    extraReducers(builder){
        builder
        .addCase(signin.pending, (state)=>{
            state.loading = true;
        })

        .addCase(signin.fulfilled, (state, action)=>{
            localStorage.setItem("AccessToken", action?.payload?.admin_data?.access_token);
            localStorage.setItem("RefreshToken", action?.payload?.admin_data?.refresh_token);
            localStorage.setItem("adminDetails", JSON.stringify(action?.payload?.admin_data?.adminDetails));
            state.accessToken = action?.payload?.admin_data?.access_token;
            state.refreshToken = action?.payload?.admin_data?.refresh_token;
            state.adminDetails = action?.payload?.admin_data?.adminDetails;
            state.success = true; 
        })

        .addCase(signin.rejected, (state, action)=>{
            state.error = action?.payload;
        })

        .addCase(users.pending, (state)=>{
            state.pending = true;
        })

        .addCase(users.fulfilled, (state, action) => {
            state.users = action?.payload;
        })
    }
})

export const {resetAll, setAdminDetails} = adminSlice.actions;

export default adminSlice.reducer;