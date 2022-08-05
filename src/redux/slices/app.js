import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpRequest from "../../services/httpRequest";

import { PATH_NAME } from "../../configs";
import authStorage from "../../helpers/authStorage"

// initialState
const initialState = {
  isLoading: false,
  user: null
}

export const login = createAsyncThunk('app/login', async (payload, thunkAPI) => {
  // console.log('thunkAPI: ', thunkAPI.getState())
  // call api
  try {
    // get access token
    const res = await httpRequest.post("/user/login", {
      ...payload.bodyData
    })
    const accessToken = res.data?.accessToken;
    authStorage.setStorage(accessToken)
    payload.navigate(PATH_NAME.ROOT)
  } catch(error) {
    console.log('login error', error.response)
  }
})

const appSlices = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      console.log('slice setLoading: ', payload)
      state.isLoading = payload
    },
    setUser: (state, { payload }) => {
      state.user = payload 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, state => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, state => {
        state.isLoading = false
      })
      .addCase(login.rejected, state => {
        state.isLoading = false
      })
  }
})


export const { setLoading, setUser } = appSlices.actions;

export default appSlices.reducer