import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../hooks/useUsers";
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

  function onSubmit(data) {
    console.log(data);
  }

  return (
    // TO DO -> ADD UNIQUE USERNAME
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <PanelTitle type="h2">Edit profile</PanelTitle>
      {isLoadingUser ? (
        <Loader />
      ) : (
        <>
          <div>
            <p>Name</p>
            <FormInput
              id="name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
          <div>
            <p>Position</p>
            <FormInput
              id="position"
              {...register("position", { required: "Position is required" })}
            />
            {errors.position && <span>{errors.position.message}</span>}
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
