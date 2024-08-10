import {  createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: true,
    isLogin:false,
    user : {}
    
}



const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setLogin: (state, action) =>{
            state.isLogin = action.payload
            state.isLoading = false
        },
        setUser:(state, action) =>{
            state.user = action.payload
            state.isLoading = false
        }
    }
})

export const {setLogin, setUser} = userSlice.actions
export default userSlice.reducer