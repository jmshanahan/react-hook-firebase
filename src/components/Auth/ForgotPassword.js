import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";

function ForgotPassword() {
  const { firebase } = useContext(FirebaseContext);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [isPasswordreset, setIsPasswordReset] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState(null);
  async function handleResetPassword() {
    try {
      await firebase.resetPassword(resetPasswordEmail);
      setIsPasswordReset(true);
      setPasswordResetError(null);
    } catch (err) {
      console.error(`Error ${err.message}`);
      setPasswordResetError(err.message);
      setIsPasswordReset(false);
    }
  }

  return (
    <div>
      <input
        type="email"
        className="input"
        placeholder="Provide your account email"
        onChange={event => setResetPasswordEmail(event.target.value)}
      />
      <button className="button" onClick={handleResetPassword}>
        Reset Pasword
      </button>
      {isPasswordreset && <p>Check email to reset password</p>}
      {passwordResetError && <p className="error-text">{passwordResetError}</p>}
    </div>
  );
}

export default ForgotPassword;
