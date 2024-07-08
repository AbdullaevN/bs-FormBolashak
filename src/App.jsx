import { useState } from 'react'

import './App.css'
// import MainForm from './components/MainForm/MainForm'
import Footer from './components/Footer/Footer'
import SignIn from './components/SignIn/SignIn'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import Header from './components/Header/Header'

function App() {
	return (
		<>
			<div className='bg-white'>
				<BrowserRouter>
					<Header />
					<Routes>
						<Route path='/' element={<SignIn />} />
						<Route path='/sign-up' element={<SignUp />} />
					</Routes>
				</BrowserRouter>
				<Footer />
			</div>
		</>
	)
}

export default App
