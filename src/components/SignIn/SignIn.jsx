import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import { useNavigate } from "react-router-dom";
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
		const re =
			// /^(([^<>()[]\\.,;:\s@"]+(\.[^<>()[]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			// /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
			/^[^\s@]+@[^\s@]+\.[^\s@]+$/
		// return re.test(String(email).toLowerCase())
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
			<div className='flex w-full'>
				<div className='w-6/12'>
					<img
						className='w-full h-screen'
						src='https://t3.ftcdn.net/jpg/03/55/60/70/360_F_355607062_zYMS8jaz4SfoykpWz5oViRVKL32IabTP.jpg'
						alt=''
					/>
				</div>
				<div className='w-6/12 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
					<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
						<img
							className='mx-auto h-10 w-auto'
							src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
							alt='Your Company'
						/>
						<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
							Войти в аккаунт
						</h2>
					</div>

					<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
						<form
							className='space-y-6'
							// action='#' method='POST'
						>
							<div>
								<label
									htmlFor='email'
									className='block text-sm font-medium leading-6 text-gray-900'
								>
									Логин
								</label>
								<div className='mt-2'>
									{emailDirty && emailError && (
										<div className='text-red-900'>{emailError}</div>
									)}
									<input
										onBlur={e => blurHandler(e)}
										value={email}
										onChange={e => emailHandler(e)}
										id='email'
										name='email'
										type='email'
										autoComplete='email'
										required
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									/>
								</div>
							</div>

							<div>
								<div className='flex items-center justify-between'>
									<label
										htmlFor='password'
										className='block text-sm font-medium leading-6 text-gray-900'
									>
										Пароль
									</label>
									{/* <div className='text-sm'>
										<a
											href='#'
											className='font-semibold text-indigo-600 hover:text-indigo-500'
										>
											Забыли пароль?
										</a>
									</div> */}
								</div>
								<div className='mt-2'>
									{passwordDirty && passwordError && (
										<div className='text-red-900'>{passwordError}</div>
									)}
									<input
										onBlur={e => blurHandler(e)}
										value={password}
										onChange={e => passwordHandler(e)}
										id='password'
										name='password'
										type='password'
										autoComplete='current-password'
										required
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									/>
								</div>
							</div>

							<div>
								<button
									disabled={!formValid}
									type='submit'
									className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
								>
									<Link to='/sign-up'>Войти</Link>
								</button>
								{/* <Link to='/home'>go to home</Link> */}
							</div>
						</form>

						<p className='mt-10 text-center text-sm text-gray-500'>
							Нет аккаунта{' '}
							<a
								href='#'
								className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
							>
								Зарегистрироваться
							</a>
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default SignIn
