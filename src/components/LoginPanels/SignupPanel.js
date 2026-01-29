import { useEffect } from "react";
import styles from "./SignupPanel.module.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
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
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // if authenticated, skip signup
  useEffect(() => {
    if (isAuthenticated) navigate("/home", { replace: true });
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
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
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <span>{errors.email.message}</span>}

          <div className={styles.name}>
            <FormInput
              type="firstName"
              placeholder="First name"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && <span>{errors.firstName.message}</span>}

            <FormInput
              type="lastName"
              placeholder="Last name"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && <span>{errors.lastName.message}</span>}
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
          {errors.position && <span>{errors.position.message}</span>}

          <FormInput
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <span>{errors.password.message}</span>}

          <FormInput
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: "Password confirmation is required",
            })}
          />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}

          <Button
            type="submit"
            variant={isSubmitting ? "disabled" : "filled"}
            size="md"
            color="brand2"
            className={styles["form-button"]}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
          <hr className={styles.hr} />
          <p className={styles["login"]} onClick={() => navigate("/login")}>
            Already a member? Log in to your account
          </p>
        </form>
      </div>
    </div>
  );
}
