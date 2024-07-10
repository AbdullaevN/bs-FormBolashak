// Создание инстанса axios с токеном
const token = localStorage.getItem('authToken')
const apiClient = axios.create({
	baseURL: 'http://77.235.20.172:3605/api',
	headers: {
		Authorization: `Bearer ${token}`,
	},
})

// Пример защищенного запроса
const getProtectedData = async () => {
	try {
		const response = await apiClient.get('/verifi_phone')
		return response.data
	} catch (error) {
		console.error('Ошибка при получении защищенных данных:', error)
		throw error
	}
}
