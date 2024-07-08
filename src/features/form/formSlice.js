import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	personalData: {
		name: '',
		lastName: '',
		inn: '',
		idNumber: '',
		nationality: '',
		dateOfBirthday: '',
		sex: '',
		authority: '',
		placeOfBirth: '',
		dateOfIssue: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		passportFront: null,
		passportBack: null,
		selfieWithPassport: null,
	},
	workData: {
		company: '',
		position: '',
		website: '',
		bio: '',
		file1: null,
	},
}

const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		updatePersonalData: (state, action) => {
			state.personalData = { ...state.personalData, ...action.payload }
		},
		updateWorkData: (state, action) => {
			state.workData = { ...state.workData, ...action.payload }
		},
	},
})

export const { updatePersonalData, updateWorkData } = formSlice.actions

export default formSlice.reducer
