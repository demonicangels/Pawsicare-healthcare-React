import axios from 'axios';
import TokenService from './TokenService';

const hostname = 'http://localhost:8080'

TokenService.setAxiosHeaders()

const sendMail = (emailData) => {
    debugger
    return axios
      .post(`${hostname}/contacts`, emailData)
      .then(response => response.data)
      .catch((error) => {
        console.log("Error sending email:", error);
      });
}
export default {
    sendMail
};