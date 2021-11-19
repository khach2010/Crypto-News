import { configureStore } from '@reduxjs/toolkit'
import { cryptoApi } from '../services/cyptoApi'

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
})
