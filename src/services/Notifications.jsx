import TokenService from "./TokenService";
import {Client} from '@stomp/stompjs';
import {v4 as uuidv4} from 'uuid';

class Notifications {

    notifications = [];
    stompClientobj = null;
    claims = TokenService.getClaims()
    userId = this.claims === undefined ? undefined :  this.claims.userId
    
    
    onNewNotification(notification){
      console.log(notification);

      localStorage.setItem("notifications", JSON.stringify(notification));
      
    }
  
    getNotifications(){
      const storedNotifications = localStorage.getItem("notifications") || [];
      console.log('Notifications array', this.notifications);
      return [...this.notifications, ...storedNotifications];
    }
  
    sendNotification(message){
      const payload = { 'id': uuidv4(), 'message': message };
      this.stompClientobj.publish({'destination': `/topic/notifications/${this.userId}`, body: payload})
    }
  
    subscribeUser(){
      try{
        const stompClient = new Client({brokerURL: 'ws://localhost:8080/ws'});
  
        stompClient.onConnect = () => {
          stompClient.subscribe(`/topic/notifications/${this.userId}`, (data) => {
            console.log(data.body)
            this.onNewNotification(data.body)
        })}
  
        stompClient.activate();
  
        this.stompClientobj = stompClient 
  
      }catch(err){
        console.log('Error connecting to websocket', err)
      }
    }
  
}
export default Notifications;