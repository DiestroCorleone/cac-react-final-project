import React from 'react';

export default function User(props) {
  return (
    <section className="pad-mid">
      <h1>{props.loggedUser.username}</h1>
      <h2>Bio</h2>
      <p>{props.loggedUser.bio}</p>
    </section>
  );
}
