import api from '@/src/utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ApiError,
  AuthState,
  LoginCredentials,
  LoginResponsePayload,
  RegisterData,
  RegisterUserPayload,
  User,
} from '../../utils/types';

// Initial state
const initialState: AuthState = {
  user: null,
  userToken: null,
  loading: false,
  error: null,
  success: false,
  isAuth:false
};

// Async thunk for user registration
export const registerUser = createAsyncThunk<
  RegisterUserPayload,
  RegisterData,
  { rejectValue: ApiError }
>('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post<RegisterUserPayload>('/api/users', userData);
    await AsyncStorage.setItem('userdata', JSON.stringify(response.data));
    console.log("Successfull Response:")
    return response.data;
  } catch (err) {
    const error = err as { response?: { data: ApiError } };
    return rejectWithValue(error.response?.data || { message: 'Registration failed' });
  }
});

// Async thunk for user login
export const loginUser = createAsyncThunk<
  LoginResponsePayload,
  LoginCredentials,
  { rejectValue: ApiError }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    // const response = await api.post<LoginResponsePayload>('/api/login', credentials);
    const data = await AsyncStorage.getItem('userdata');
    if(data){
      const user = JSON.parse(data)
      if((user.email === credentials.email) && (user.password === credentials.password))
        return user
      else
        return rejectWithValue({message:"User not found"})
    }
    return rejectWithValue({message:"Sign up first bro.."})
  } catch (err) {
    const error = err as { response?: { data: ApiError } };
    return rejectWithValue(error.response?.data || { message: 'Login failed' });
  }
});

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk<
  User,
  Partial<User>,
  { state: { auth: AuthState }; rejectValue: ApiError }
>('auth/updateProfile', async (userData, { getState, rejectWithValue }) => {
  try {
    const userdata = await AsyncStorage.getItem('userdata')
    if(userdata){
      const user = JSON.parse(userdata)
      const newdata = {...user,...userData}
      return newdata;
    }
  } catch (err) {
    const error = err as { response?: { data: ApiError } };
    return rejectWithValue(error.response?.data || { message: 'Profile update failed' });
  }
});

// Async thunk for checking authentication status
export const checkAuthStatus = createAsyncThunk<
  { user: User; userToken: string } | null,
  void,
  { rejectValue: null }
>('auth/checkStatus', async (_, { rejectWithValue }) => {
  try {
    const userdata = await AsyncStorage.getItem('userdata');
    if (userdata) {
      const user = JSON.parse(userdata)
      return { user: user, userToken: "some token" };
    }
    return rejectWithValue(null);
  } catch (err) {
    await AsyncStorage.removeItem('userToken');
    return rejectWithValue(null);
  }
});

// Async thunk for logout
export const logoutUser = createAsyncThunk<void, void, { rejectValue: ApiError }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      return
    } catch (err) {
      const error = err as { message: string };
      return rejectWithValue({ message: error.message || 'Logout failed' });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action: any) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload;
        state.userToken = "some token";
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Registration failed';
      })
      
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: any) => {
        state.loading = false;
        state.user = action.payload;
        state.userToken = "some token";
        state.isAuth = true;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
      })
      
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        console.log(":::::;; update ::::", action.payload)
        state.success = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Profile update failed';
      })
      
      // Check Auth Status
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        checkAuthStatus.fulfilled,
        (state, action: PayloadAction<{ user: User; userToken: string } | null>) => {
          state.loading = false;
          if (action.payload) {
            state.user = action.payload.user;
            state.userToken = action.payload.userToken;
            console.log(":::::::::: statussx :::::::::::::::",action.payload.user)
          }
        }
      )
      .addCase(checkAuthStatus.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.userToken = null;
      })
      
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.userToken = null;
        state.isAuth = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Logout failed';
      });
  },
});

export const { clearError, resetSuccess } = authSlice.actions;
export default authSlice.reducer;