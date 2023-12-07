const UsernamePlaceholder = (props) => {
    if (props.username) {
      return (<h2>Username: {props.username}</h2>)
    }
    if(props.receiver){
      return (<h2>Receiver: {props.receiver}</h2>)
    }

    return (
      <>
        <label htmlFor='username'>Me:</label>
        <label htmlFor="receiver"></label>
      </>
    );
  }

  export default UsernamePlaceholder;