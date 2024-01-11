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

      this.notifications.push(notification);
    }
  
    getNotifications(){
      return this.notifications;
    }
  
    sendNotification(message, to){
      const payload = { 'id': uuidv4(), 'message': message };
      this.stompClientobj.publish({'destination': `/topic/notifications/${to}`, body: JSON.stringify(payload)})
    }
  
    subscribeUser(){
      try{
        const stompClient = new Client({brokerURL: 'ws://localhost:8080/ws'});
  
        stompClient.onConnect = () => {
          stompClient.subscribe(`/topic/notifications/${this.userId}`, (data) => {
            this.onNewNotification(data.body)
        })}
  
        stompClient.activate();
  
        this.stompClientobj = stompClient 
  
      }catch(err){
        console.log('Error connecting to websocket', err)
      }
    }

    clearNotis(){
      debugger
      this.notifications && this.notifications.length > 0 ? this.notifications = [] : this.notifications;
    }
  
}

export default Notifications;