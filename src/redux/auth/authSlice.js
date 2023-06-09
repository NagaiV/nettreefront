import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const login = createAsyncThunk(
  'auth/login',
  async (payload, thunkAPI) => {
    try {
      console.log('payloadpayload', payload)
      return await authService.login(payload)
    } catch (error) {
      console.log('error inside login createAsyncThunk', error)
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (payload, thunkAPI) => {
    try {
      return await authService.register(payload)
    } catch (error) {
      console.log('error inside login createAsyncThunk', error)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('actionfulfilled', action)
        state.isLoading = false
        state.isSuccess = true
        state.user = action.data
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })

      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log('actionfulfilled', action)
        state.isLoading = false
        state.isSuccess = true
        state.user = action.data
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
