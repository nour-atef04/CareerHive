// npm run server

import { useEffect, useState } from "react";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import styles from "./FormPanel.module.css";
import Logo from "../Logo/Logo";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";

export default function FormPanel() {
  // pre-fill for dev purposes
  const [email, setEmail] = useState("jessica.william@example.com");
  const [password, setPassword] = useState("qwerty12345");
  // const { isAuthenticated, login } = useAuth();

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  // if authenticated, skip login
  useEffect(() => {
    if (isAuthenticated) navigate("/home", { replace: true });
  }, [isAuthenticated, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  }

  return (
    <div className={styles["login-panel"]}>
      <Logo />
      <div className={styles["form-div"]}>
        <h2 className={styles["form-title"]}>Welcome Back to CareerHive</h2>
        <form className={styles["form-inner"]} onSubmit={handleSubmit}>
          <FormInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <FormInput
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
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
          <Button
            type="submit"
            variant="filled"
            size="md"
            color="brand2"
            className={styles["form-button"]}
          >
            Sign In
          </Button>
          <hr className={styles.hr} />
          <p className={styles["join-now"]}>New to CareerHive? Join Now</p>
        </form>
      </div>
    </div>
  );
}
