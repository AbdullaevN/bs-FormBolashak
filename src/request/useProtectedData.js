import { useState, useEffect } from 'react'
import axios from 'axios'

const useProtectedData = () => {
	const [data, setData] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = localStorage.getItem('authToken')
				const response = await axios.get(
					'http://77.235.20.172:3605/api/protected-data',
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				setData(response.data)
			} catch (error) {
				console.error('Ошибка при получении защищенных данных:', error)
			}
		}

		fetchData()
	}, [])

	return data
}

export default useProtectedData
