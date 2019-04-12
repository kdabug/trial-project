import React from "react";
import { eyeAvs } from "../eyeAvs";

export default props => {
  const {
    show,
    toggle,
    username,
    email,
    password,
    onChange,
    onSubmit,
    onClick,
    submitButtonText,
    backButtonText,
    avatar,
    passwordAsk,
    title,
    userData
  } = props;

  const showRegister = !show && !toggle;
  console.log("register user form props", userData);
  return (
    <>
      {showRegister && (
        <form className="user-form-container">
          <h2>{title}</h2>
          <div className="text-input-container">
            <div className="text-input">
              <label htmlFor="email">Email </label>
              <input
                type="text"
                onChange={onChange}
                name="email"
                id="email"
                value={email}
              />
            </div>
            <div className="text-input">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                onChange={onChange}
                name="username"
                id="username"
                value={userData ? userData.user : username}
              />
            </div>
            <div className="text-input">
              {passwordAsk && (
                <>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    onChange={onChange}
                    name="password"
                    id="password"
                    value={password}
                  />
                </>
              )}
            </div>
          </div>
          <label htmlFor="avatar">Choose your rat: </label>
          {eyeAvs &&
            eyeAvs.map((el, i) => (
              <input
                type="textarea"
                className={`avatar-${el.id}`}
                name="avatar_id"
                key={el.id}
                value={el.id}
                onChange={onChange}
                onClick={onChange}
                readonly="readonly"
              />
            ))}
          <button type="submit" onClick={onSubmit}>
            {submitButtonText}
          </button>
          <button type="submit" onClick={onClick}>
            {backButtonText}
          </button>
          <button type="submit" onClick={() => this.props.history.push(`/`)}>
            Back to Home
          </button>
        </form>
      )}
    </>
  );
};
