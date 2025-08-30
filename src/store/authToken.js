import {createSlice} from '@reduxjs/toolkit';

// basically declaring the "type safety"
const initialState={
  accessToken:'',
  lastRefresh:0,
  loading:false,
  error:''
};

const authSlice = createSlice({
  name:'authToken',
  initialState,
  reducers:{
    setAccessToken(state,action){
      state.accessToken = action.payload; 
      state.lastRefresh = Date.now(); 
      state.error='';
    },

    clearAccessToken(state){ 
      state.accessToken ='';
      state.lastRefresh = 0;
      state.error='';
    },

    loadingAccessToken(state,action){
      state.loading =  action.payload; 
    },

    setAuthError(state,action){ 
      state.error = action.payload;
    },
  }
});
// All reducers needs to be exported
export const { 
  setAccessToken, 
  clearAccessToken,
  loadingAccessToken,
  setAuthError,
} = authSlice.actions;

export default authSlice.reducer;