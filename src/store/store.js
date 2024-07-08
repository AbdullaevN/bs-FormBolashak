// src/store/store.js
import { configureStore } from '@reduxjs/toolkit'
import exampleReducer from './slices/exampleSlice'
import formReducer from './slices/formSlice'

const store = configureStore({
	reducer: {
		example: exampleReducer,
		form: formReducer,
	},
})

export default store
