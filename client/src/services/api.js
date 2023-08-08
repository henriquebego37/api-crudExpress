import Axios from 'axios';

export const apiGames = Axios.create({
  baseURL: 'http://localhost:3001', 
});