import { useState } from "react";
import { Modal } from "..";

import "./Form.css";

const status = [
  {
    id: "1",
    literal: "Live",
    value: "live",
  },
  {
    id: "2",
    literal: "Draft",
    value: "draft",
  },
  {
    id: "3",
    literal: "Done",
    value: "done",
  },
];

export default function Form({ closeModal, dataToEdit, onSubmit }) {
  const [formState, setFormState] = useState(
    dataToEdit || {
      project: "",
      description: "",
      status: "live",
    }
  );

  const handleChange = ({ target: { name, value } }) => {
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(formState);
    setFormState({
      project: "",
      description: "",
      status: "live",
    });
  };

  return (
    <Modal closeModal={closeModal}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="project">Project</label>
          <input
            className="form-control"
            type="text"
            name="project"
            placeholder="Put your project..."
            onChange={handleChange}
            value={formState.project}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            name="description"
            placeholder="Put your Description..."
            onChange={handleChange}
            value={formState.description}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            onChange={handleChange}
            value={formState.status}
          >
            {status.map(({ id, literal, value }) => (
              <option key={id} value={value}>
                {literal}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-outline flex" type="submit">
          Submit Data
        </button>
      </form>
    </Modal>
  );
}
