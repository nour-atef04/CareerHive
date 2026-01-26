import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useEditProfile, useUser } from "../../hooks/useUsers";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import Loader from "../ui/Loader";
import PanelTitle from "../ui/PanelTitle";
import styles from "./EditProfileForm.module.css";

export default function EditProfileForm() {
  const { currentUser } = useAuth();
  const { data: user, isLoading: isLoadingUser } = useUser(currentUser.id);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
  } = useForm({ values: user });
  const { mutate: editMutation } = useEditProfile();

  function onSubmit(data) {
    editMutation(data);
  }

  return (
    // TO DO -> ADD UNIQUE USERNAME
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <PanelTitle type="h2">Edit profile</PanelTitle>
      {isLoadingUser ? (
        <Loader />
      ) : (
        <>
          <div className={styles.input}>
            <p>Name</p>
            <FormInput
              id="name"
              {...register("name", {
                required: "Name is required",
                setValueAs: (v) => v.trim(),
                maxLength: {
                  value: 20,
                  message: "Name cannot exceed 20 characters",
                },
              })}
            />
            {errors.name && (
              <span className={styles.error}>{errors.name.message}</span>
            )}
          </div>
          <div className={styles.input}>
            <p>Position</p>
            <FormInput
              id="position"
              {...register("position", {
                required: "Position is required",
                setValueAs: (v) => v.trim(),
                maxLength: {
                  value: 20,
                  message: "Position cannot exceed 20 characters",
                },
              })}
            />
            {errors.position && (
              <span className={styles.error}>{errors.position.message}</span>
            )}
          </div>
          <Button
            type="submit"
            variant={!isDirty || isSubmitting ? "disabled" : "filled"}
          >
            {isSubmitting ? "Saving changes..." : "Save changes"}
          </Button>
        </>
      )}
    </form>
  );
}
