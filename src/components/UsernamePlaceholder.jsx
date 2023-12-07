const UsernamePlaceholder = (props) => {
    if (props.username) {
      return (<h2>Username: {props.username}</h2>)
    }

    return (
      <>
        <label htmlFor='username'>Username:</label>
      </>
    );
  }

  export default UsernamePlaceholder;