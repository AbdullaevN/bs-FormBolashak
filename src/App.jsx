import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainForm from './components/MainForm/MainForm'
import Footer from './components/Footer/Footer'
import SignIn from './components/SignIn/SignIn'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp/SignUp'

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			{/* <h1 className='text-green-500'>Hello world</h1> */}
			{/* <MainForm /> */}
			{/* <SignIn /> */}
			{/* <Footer /> */}
			<div className='bg-white'>
				<BrowserRouter>
					{/* <MyNavbar /> */}
					<Routes>
						<Route path='/' element={<SignIn />} />
						<Route path='/sign-up' element={<SignUp />} />

						{/* <Route path="/services" element={<Services />} /> */}
						{/* <Route path="/blog" element={<Blog />} /> */}
						{/* <Route path="/contacts" element={<Contacts />} /> */}
						{/* <Route path="/test" element={<TestPage />} /> */}
						{/* <Route path="/blog/:id" element={<BlogID />} /> */}
					</Routes>
					{/* <MyFooter /> */}
				</BrowserRouter>
			</div>
		</>
	)
}

export default App
