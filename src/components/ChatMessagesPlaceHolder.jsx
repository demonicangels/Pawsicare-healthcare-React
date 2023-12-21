const MessageReceived = (props) => {
    
    return (
        <div>
            <div key={props.key} className="userMessageHolder">
            <b>{props.from}</b>: {props.text} {props.direct ? <b>(direct)</b> : ''}
            </div>
        </div>
    );
};

const ChatMessagesPlaceholder = (props) => {
    console.log('Rendering messages:', props.messagesReceived);
    return (
        <div className="messagesBox">
            {props.messagesReceived
                .map(message => <MessageReceived key={message.id} from={message.from} direct={message.to === props.username} text={message.text} />)}
        </div>
    );
}

export default ChatMessagesPlaceholder;