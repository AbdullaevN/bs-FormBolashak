import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
	currentStep: 1,
	formData: {},
	isLoading: false,
	error: null,
}

export const submitForm = createAsyncThunk(
	'form/submitForm',
	async (formData, { rejectWithValue }) => {
		try {
			const response = await fetch('http://localhost:5000/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			const data = await response.json()
			return data
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		setStep(state, action) {
			state.currentStep = action.payload
		},
		setFormData(state, action) {
			state.formData = { ...state.formData, ...action.payload }
		},
	},
	extraReducers: builder => {
		builder
			.addCase(submitForm.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(submitForm.fulfilled, (state, action) => {
				state.isLoading = false
				// handle successful form submission
			})
			.addCase(submitForm.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
	},
})

export const { setStep, setFormData } = formSlice.actions
export default formSlice.reducer
