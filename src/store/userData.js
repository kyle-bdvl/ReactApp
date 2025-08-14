import {createSlice} from "@reduxjs/toolkit";
/*
user data 
username
user email 
this is to show in the header 

*/
// from local Storage
const savedUser = JSON.parse(localStorage.getItem("userDetail") || "{}")
const initialState = { 
  username: savedUser.username|| "",
  email : savedUser.email ||""
}

const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState, 
  reducers: {
    setUserDetail(state,action){
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    clearUserDetail(state){
      state.username = "";
      state.email = "";
    }
  },
});

export const {setUserDetail, clearUserDetail} = userDetailSlice.actions;
export default userDetailSlice.reducer;