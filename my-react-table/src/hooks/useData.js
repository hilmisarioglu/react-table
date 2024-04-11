import { useState } from "react";
import { useStoreActions } from "./useStoreActions";

export function useData() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [datatoEdit, setDataToEdit] = useState(null);
  const { addProject, projectUpdated, removeProject } = useStoreActions();

  const handleCloseModal = () => setIsModalOpen(false);
  
  const handleOpenModal = () => setIsModalOpen(true);

  const handleEditData = (data) => {
    setDataToEdit(data);
  };

  const handleDelete = (id) => {
    removeProject(id);
    alert("Project has been deleted");
  };

  const onSubmit = (formState) => {
    if (datatoEdit !== null) {
      projectUpdated(formState);
      handleCloseModal();
      alert("Project Updated Successfully");
      setDataToEdit(null);
    } else {
      addProject(formState);
      handleCloseModal();
      alert("Project Created Successfully");
    }
  };

  const FormEditData = datatoEdit !== null && datatoEdit;

  return {
    isModalOpen,
    FormEditData,
    handleCloseModal,
    onSubmit,
    handleEditData,
    handleDelete,
    handleOpenModal,
  };
}
