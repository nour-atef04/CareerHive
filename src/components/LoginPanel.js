import { useState } from "react";
import Button from "./Button";
import FormInput from "./FormInput";
import styles from "./LoginPanel.module.css";
import Logo from "./Logo";

export default function LoginPanel() {
  // pre-fill for dev purposes
  const [email, setEmail] = useState("john.doe@example.com");
  const [password, setPassword] = useState("qwerty12345");

  return (
    <div className={styles["login-panel"]}>
      <Logo />
      <div className={styles["form-div"]}>
        <h2 className={styles["form-title"]}>Welcome Back to CareerHive</h2>
        <form className={styles["form-inner"]}>
          <FormInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles["form-options"]}>
            <div>
              <label>
                <input type="checkbox" />
                {"  "}Keep me signed in
              </label>
            </div>

            <p className={styles["forgot-password"]}>Forgot password?</p>
          </div>
          <Button type="submit">Sign In</Button>
          <hr className={styles.hr} />
          <p className={styles["join-now"]}>New to CareerHive? Join Now</p>
        </form>
      </div>
    </div>
  );
}
