
import TokenService from './TokenService';
import axiosApiResponseInterceptor from './AxiosResponseInterceptor';

const hostname = 'http://localhost:8080'

const sendMail = (emailData) => {
    debugger
    return axiosApiResponseInterceptor
      .post(`${hostname}/contacts`, emailData)
      .then(response => response.data)
      .catch((error) => {
        console.log("Error sending email:", error);
      });
}
export default {
    sendMail
};