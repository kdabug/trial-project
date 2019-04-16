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
  const style = {
    backgroundColor: `#0f0eff`,
    borderRadius: `10px`,
    border: `4px solid #CEDAF4`
  };

  const showRegister = !show && !toggle;
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  console.log("register user form props", userData);
  return (
    <>
      {showRegister && (
        <form className="user-form-container">
          <h2>{title}</h2>
          <div className="text-input-container">
            <div className="text-input">
              <>
                <label htmlFor="email">Email </label>
              </>
              <>
                <input
                  type="text"
                  onChange={onChange}
                  name="email"
                  id="email"
                  value={email}
                />
              </>
            </div>
            <div className="text-input">
              <>
                <label htmlFor="username">User Name</label>
              </>
              <>
                <input
                  type="text"
                  onChange={onChange}
                  name="username"
                  id="username"
                  value={userData ? userData.user : username}
                />
              </>
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
          <label htmlFor="avatar">Pick an eye: </label>
          <div className="eye-container">
            {eyeAvs &&
              eyeAvs.map((el, i) => {
                const randomColor = Math.floor(
                  Math.random() * 16777215
                ).toString(16);
                return (
                  <input
                    type="textarea"
                    className={`avatar-${el.id}`}
                    name="avatar_id"
                    key={el.id}
                    value={el.id}
                    onChange={onChange}
                    onClick={onChange}
                    readonly="readOnly"
                    //style={{ backgroundColor: `#${randomColor}` }}
                    style={style}
                  />
                );
              })}
          </div>
          <div className="user-form-button-container">
            <button type="submit" className="pretty-button" onClick={onSubmit}>
              {submitButtonText}
            </button>
            <button type="submit" className="pretty-button" onClick={onClick}>
              {backButtonText}
            </button>
            <button
              type="submit"
              className="pretty-button"
              onClick={() => this.props.history.push(`/`)}
            >
              Back to Home
            </button>
          </div>
        </form>
      )}
    </>
  );
};
