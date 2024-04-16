import { Table, Form } from "./components";
import { PlusIcon } from "./components/Icons/Icons";
import { useData } from "./hooks/useData";
import { useAppSelector } from "./hooks/useStore";

export default function App() {
  const {
    handleOpenModal,
    handleEditData,
    handleDelete,
    FormEditData,
    onSubmit,
    isModalOpen,
    handleCloseModal,
  } = useData();
  const data = useAppSelector((state) => state.projects.objects);
  const settings = useAppSelector((state) => state.projects.settings);
  return (
    <div className="App">
      <Table
        openModal={handleOpenModal}
        closeModal={handleCloseModal}
        onEditData={handleEditData}
        onDeleteData={handleDelete}
        tableData={data}
        settings={settings}
      />
      <button onClick={handleOpenModal} className="btn btn-primary">
        <PlusIcon />
        Create
      </button>
      {isModalOpen && (
        <Form
          closeModal={handleCloseModal}
          dataToEdit={FormEditData}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
}
