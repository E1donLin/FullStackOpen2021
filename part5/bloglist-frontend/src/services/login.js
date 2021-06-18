import axios from 'axios'
const baseUrl = '/api/login'

const login = async (Credential) => {
  const response = await axios.post(baseUrl, Credential)
  return response.data
}

const loginService = {
  login,
}

export default loginService
