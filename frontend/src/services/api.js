import axios from 'axios'; //HTTP istekleri göndermek için kullanılan kütüphane

//instance oluşturur
const api = axios.create({
  baseURL: 'http://localhost:5000/api', //Tüm isteklerin temeli
});

export default api;
