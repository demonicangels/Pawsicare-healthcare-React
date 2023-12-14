const MessageReceived = (props) => {
    
    return (
        <div key={props.key}>
            <b>{props.from}</b>: {props.text} {props.direct ? <b>(direct)</b> : ''}
        </div>
    );
};

const ChatMessagesPlaceholder = (props) => {
    console.log('Rendering messages:', props.messagesReceived);
    return (
        <>
            <h2>Messages:</h2>
            {props.messagesReceived
                .map(message => <MessageReceived key={message.id} from={message.from} direct={message.to === props.username} text={message.text} />)}
        </>
    );
}

export default ChatMessagesPlaceholder;