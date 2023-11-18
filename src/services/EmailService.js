import axios from 'axios';
import TokenService from './TokenService';

const hostname = 'http://localhost:8080'


const sendMail = (emailData) => {
    const axiosWithHeaders = TokenService.setAxiosHeaders(axios);

    return axiosWithHeaders
      .post(`${hostname}/contacts`, emailData)
      .then((response) => response.data)
      .catch((error) => {
        console.log("Error sending email:", error);
      });
}
export default {
    sendMail
};