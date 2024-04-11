import {
  createProject,
  deleteProject,
  updateProject
} from "../store/slices/slice";
import { useAppDispatch } from "./useStore";

export function useStoreActions() {
  const dispatch = useAppDispatch();

  const addProject = (payload) => {
    dispatch(createProject(payload));
  };

  const removeProject = (payload) => {
    dispatch(deleteProject(payload));
  };

  const projectUpdated = (payload) => {
    dispatch(updateProject(payload));
  };

  return {
    addProject,
    removeProject,
    projectUpdated
  };
}
