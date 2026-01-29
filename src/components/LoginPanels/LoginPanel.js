// npm run server (when using db.json)

import { useEffect } from "react";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import styles from "./LoginPanel.module.css";
import Logo from "../Logo/Logo";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";

export default function LoginPanel() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    // pre-fill form for dev purposes
    defaultValues: {
      email: "jessica.william@example.com",
      password: "qwerty12345",
    },
  });

  // if authenticated, skip login
  useEffect(() => {
    if (isAuthenticated) navigate("/home", { replace: true });
  }, [isAuthenticated, navigate]);

  function onSubmit(data) {
    login(data.email, data.password, () => navigate("/home"));
  }

  return (
    <div className={styles["login-panel"]}>
      <Logo />
      <div className={styles["form-div"]}>
        <h2 className={styles["form-title"]}>Welcome Back to CareerHive</h2>
        <form
          className={styles["form-inner"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <span>{errors.email.message}</span>}

          <FormInput
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <span>{errors.password.message}</span>}

          <div className={styles["form-options"]}>
            <div>
              <label>
                <input type="checkbox" {...register("keepLoggedIn")} />
                {"  "}Keep me signed in
              </label>
            </div>

            <p className={styles["forgot-password"]}>Forgot password?</p>
          </div>
          <Button
            type="submit"
            variant={isSubmitting ? "disabled" : "filled"}
            size="md"
            color="brand2"
            className={styles["form-button"]}
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </Button>
          <hr className={styles.hr} />
          <p className={styles["join-now"]} onClick={() => navigate("/signup")}>
            New to CareerHive? Join Now
          </p>
        </form>
      </div>
    </div>
  );
}
