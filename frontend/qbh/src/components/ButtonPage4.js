import React, { useState } from 'react';

const ButtonPage4 = () => {
  const [authorName, setAuthorName] = useState('');
  //const [bookID, setBookID] = useState('');
  const [message, setMessage] = useState('');

  const handleDeleteByAuthorName = () => {
    fetch(`http://localhost:3000/deleteAuthor/${authorName}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // const handleDeleteByID = () => {
  //   fetch(`http://localhost:3000/deleteAuthor/${bookID}`, {
  //     method: 'DELETE'
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       setMessage(data.message);
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  // };

  return (
    <div>
      <h1>Only delete by author name</h1>
      <p>I have created an API for book ID deletion, I will add it later.</p>
      <input type="text" value={authorName} onChange={e => setAuthorName(e.target.value)} />
      <button onClick={handleDeleteByAuthorName}>Delete Author</button>
      <br />
      <br />
      {/* <input type="text" value={bookID} onChange={e => setBookID(e.target.value)} />
      <button onClick={handleDeleteByID}>Delete by ID</button> */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ButtonPage4;



