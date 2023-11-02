import axios from 'axios';

const hostname = 'http://localhost:8080'

const sendMail = (emailData) => {
    console.log(emailData)
    return axios.post(`${hostname}/contacts`, emailData)
    .then(response => response.data)
    .catch(error => {
        console.log("Error sending email:", error)});
}
export default {
    sendMail
} ;