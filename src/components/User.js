import React, { useState } from 'react';
import { editBio } from '../adapters/FirebaseAdapters';

export default function User(props) {
  const [bio, setBio] = useState(
    props.loggedUser.bio || 'Contanos algo sobre vos :)'
  );
  const [isEditable, setIsEditable] = useState(false);

  const handleChange = (event) => {
    setBio(event.target.value);
  };

  const updateBio = (event) => {
    event.preventDefault();
    bio
      ? editBio(props.loggedUser.idUser, bio, setIsEditable)
      : alert('Por favor, ingresá texto en tu bio.');
  };

  return (
    <section className="pad-mid">
      <h1>{props.loggedUser.username}</h1>
      <h2>
        Bio
        <i
          className="fa fa-fw fa-pencil"
          onClick={() => setIsEditable(!isEditable)}
        ></i>
      </h2>
      {!isEditable ? (
        <p>{bio}</p>
      ) : (
        <form onSubmit={updateBio}>
          <input
            type="text"
            value={bio}
            name="bio"
            onChange={handleChange}
            placeholder={bio}
            className={isEditable ? 'border-black pad-mid' : 'pad-mid'}
          />
          <input
            type="submit"
            className="back-black pad-small color-grey"
            value="Actualizar bio"
          />
        </form>
      )}
    </section>
  );
}
