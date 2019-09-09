import axios from 'axios'

const baseURL = 'https://localhost:3000'

localStorage.setItem(
  'jwt',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp'
)

export const api = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
})
