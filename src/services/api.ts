import axios from 'axios'
import configService from './config'

const api = axios.create({
  baseURL: configService.iTunesApiUrl
})

export default api
