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
    <section className="pad-mid width-80">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
        alt="Profile"
        className="width-30 m-auto border-black"
      />
      <h1>{props.loggedUser.username || 'Nombre de usuario'}</h1>
      <p>{props.loggedUser.email || 'email@mail.com'}</p>
      <br />
      <hr />
      <br />
      <h4>
        Bio
        <i
          className="fa fa-fw fa-pencil"
          onClick={() => setIsEditable(!isEditable)}
        ></i>
      </h4>
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
