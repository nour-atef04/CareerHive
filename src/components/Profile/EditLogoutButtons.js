import { MdEdit } from "react-icons/md";
import styles from "./EditLogoutButtons.module.css";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import Modal from "../ui/Modal";
import EditProfileForm from "./EditProfileForm";

export default function EditLogoutButtons() {
  const [openEditModal, setOpenEditModal] = useState(false);

  const { logout } = useAuth();

  function handleLogout(e) {
    e.preventDefault();
    logout(); // protected route will automatically detect isAuth = false and redirect to login
  }

  return (
    <div className={styles["my-profile"]}>
      <MdEdit
        onClick={() => setOpenEditModal(true)}
        size={20}
        className={styles.edit}
      />
      <Button onClick={handleLogout} variant="outline-dark" color="brand2">
        Logout
      </Button>
      {openEditModal && (
        <Modal onClose={() => setOpenEditModal(false)}>
          <EditProfileForm />
        </Modal>
      )}
    </div>
  );
}
