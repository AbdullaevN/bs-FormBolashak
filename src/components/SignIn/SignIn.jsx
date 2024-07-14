import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const SignIn = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [emailDirty, setEmailDirty] = useState(false)
	const [passwordDirty, setPasswordDirty] = useState(false)

	const [emailError, setEmailError] = useState(
		'Поле для почты не должна быть пустым'
	)
	const [passwordError, setPasswordError] = useState(
		'Поле для пароля не может быть пустым'
	)

	const [formValid, setFormValid] = useState(false)

	useEffect(() => {
		// .preventDefault(e)

		if (emailError || passwordError) {
			setFormValid(false)
		} else {
			setFormValid(true)
		}
	}, [emailError, passwordError])

	const emailHandler = e => {
		setEmail(e.target.value)
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!re.test(String(e.target.value).toLowerCase())) {
			setEmailError('Почта заполнена некорректна')
		} else {
			setEmailError('')
		}
	}

	const passwordHandler = e => {
		setPassword(e.target.value)
		if (e.target.value.length < 3 || e.target.value.length > 8) {
			setPasswordError('Пароль должен быть длинее 3 и меньше 8 символов')
			if (!e.target.value) {
				setPasswordError('Пароль не может быть пустым')
			}
		} else {
			setPasswordError('')
		}
	}
	const blurHandler = e => {
		switch (e.target.name) {
			case 'email':
				setEmailDirty(true)
				break
			case 'password':
				setPasswordDirty(true)
				break
		}
	}

	return (
		<>
			<div className='md:flex  w-full '>
				<div
					className='md:w-6/12   
				'
				>
					<img
						className='w-full h-screen object-cover '
						src='https://data.kaktus.media/image/big/2018-06-14_10-42-42_310132.jpg'
						alt=''
					/>
				</div>
				<div
					className='md:w-6/12 flex min-h-full flex-1 flex-col justify-center md:px-6 py-12 lg:px-8
				sm:w-full sm:px-10 sm:flex sm:justify-center sm:text-center p-10 sm:items-center
				
				'
				>
					<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
						<h2 className='w-full text-2xl flex items-center justify-center font-bold'>
							Добро пожаловать на наш политехнический университет им.Раззакова!
							<br />
							Мы рады приветствовать наших абитуриентов!
						</h2>
						<h2 className='mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-900'>
							Хотите оставить заявку на поступление?
						</h2>
					</div>

					<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
						<p className='mt-10 text-center text-sm text-gray-500'>
							{' '}
							<Link to='/sign-up'>
								<button className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
									Оставить заявку
								</button>
							</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default SignIn
