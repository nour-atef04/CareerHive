import { useEffect } from "react";
import styles from "./SignupPanel.module.css";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import FormInput from "../ui/FormInput";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";

export const JOB_TITLES = [
  "Student",
  "Intern",
  "Freelancer",
  "Self-Employed",
  "Founder / CEO",
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "Product Manager",
  "DevOps Engineer",
  "QA Engineer",
  "System Administrator",
  "UI/UX Designer",
  "Graphic Designer",
  "Content Writer",
  "Art Director",
  "Video Editor",
  "Project Manager",
  "Digital Marketer",
  "SEO Specialist",
  "Business Analyst",
  "Human Resources (HR)",
  "Recruiter",
  "Accountant",
  "Sales Representative",
  "Customer Success Manager",
];

export default function SignupPanel() {
  const { isAuthenticated, signUp, isLoading } = useAuth();
  const navigate = useNavigate();

  // if authenticated, skip signup
  useEffect(() => {
    if (isAuthenticated) navigate("/home", { replace: true });
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm();

  async function onSubmit(data) {
    console.log(errors);
    const { email, password, firstName, lastName, position } = data;
    const fullName = `${firstName} ${lastName}`.trim();
    signUp(email, password, fullName, position, () => navigate("/home"));
  }

  return (
    <div className={styles["signup-panel"]}>
      <Logo />
      <div className={styles["form-div"]}>
        <h2 className={styles["form-title"]}>Welcome to CareerHive</h2>
        <form
          className={styles["form-inner"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
            })}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}

          <div className={styles.name}>
            <FormInput
              type="text"
              placeholder="First name"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && (
              <span className={styles.error}>{errors.firstName.message}</span>
            )}

            <FormInput
              type="text"
              placeholder="Last name"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && (
              <span className={styles.error}>{errors.lastName.message}</span>
            )}
          </div>
          <FormInput
            id="position"
            list="position-options"
            placeholder="Position"
            autoComplete="off"
            {...register("position", { required: "Position is required" })}
          />
          <datalist id="position-options">
            {JOB_TITLES.map((title) => (
              <option key={title} value={title} />
            ))}
          </datalist>
          {errors.position && (
            <span className={styles.error}>{errors.position.message}</span>
          )}

          <FormInput
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min 6 characters" },
            })}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}

          <FormInput
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: "Password confirmation is required",
              validate: (val) => {
                if (watch("password") !== val) return "Passwords do not match";
              },
            })}
          />
          {errors.confirmPassword && (
            <span className={styles.error}>
              {errors.confirmPassword.message}
            </span>
          )}

          <Button
            type="submit"
            variant={isSubmitting || isLoading ? "disabled" : "filled"}
            disabled={isSubmitting || isLoading}
            size="md"
            color="brand2"
            className={styles["form-button"]}
          >
            {isSubmitting || isLoading ? "Signing Up..." : "Sign Up"}
          </Button>
          <hr className={styles.hr} />
          <Link to="/login" className={styles["login"]}>
            Already a member? Log in to your account
          </Link>
        </form>
      </div>
    </div>
  );
}
