import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
    {
      id: crypto.randomUUID(),
      project: "midudev 1",
      description: "MiduDev project 1",
      status: "live",
    },
    {
      id: crypto.randomUUID(),
      project: "Header 2",
      description: "This is the Header project 2",
      status: "draft",
    },
    {
      id: crypto.randomUUID(),
      project: "Main Content 3",
      description: "This is the Main Content project 3",
      status: "done",
    },
    {
      id: crypto.randomUUID(),
      project: "midudev 4",
      description: "MiduDev project 4",
      status: "live",
    },
    {
      id: crypto.randomUUID(),
      project: "Header 5",
      description: "This is the Header project 5",
      status: "draft",
    },
    {
      id: crypto.randomUUID(),
      project: "Main Content 6",
      description: "This is the Main Content project 6",
      status: "done",
    },
    {
      id: crypto.randomUUID(),
      project: "midudev 7",
      description: "MiduDev project 7",
      status: "live",
    },
    {
      id: crypto.randomUUID(),
      project: "Header 8",
      description: "This is the Header project 8",
      status: "draft",
    },
    {
      id: crypto.randomUUID(),
      project: "Main Content 9",
      description: "This is the Main Content project 9",
      status: "done",
    },
    {
      id: crypto.randomUUID(),
      project: "midudev 10",
      description: "MiduDev project 10",
      status: "live",
    },
    {
      id: crypto.randomUUID(),
      project: "Header 11",
      description: "This is the Header project 11",
      status: "draft",
    },
    {
      id: crypto.randomUUID(),
      project: "Main Content 12",
      description: "This is the Main Content project 12",
      status: "done",
    },
    {
      id: crypto.randomUUID(),
      project: "midudev 13",
      description: "MiduDev project 13",
      status: "live",
    },
    {
      id: crypto.randomUUID(),
      project: "Header 14",
      description: "This is the Header project 14",
      status: "draft",
    },
    {
      id: crypto.randomUUID(),
      project: "Main Content 15",
      description: "This is the Main Content project 15",
      status: "done",
    },
    {
      id: crypto.randomUUID(),
      project: "midudev 16",
      description: "MiduDev project 16",
      status: "live",
    },
    {
      id: crypto.randomUUID(),
      project: "Header 17",
      description: "This is the Header project 17",
      status: "draft",
    },
    {
      id: crypto.randomUUID(),
      project: "Main Content 18",
      description: "This is the Main Content project 18",
      status: "done",
    },
    {
      id: crypto.randomUUID(),
      project: "midudev 19",
      description: "MiduDev project 19",
      status: "live",
    },
    {
      id: crypto.randomUUID(),
      project: "Header 20",
      description: "This is the Header project 20",
      status: "draft",
    },
    {
      id: crypto.randomUUID(),
      project: "Main Content 21",
      description: "This is the Main Content project 21",
      status: "done",
    },
    {
      id: crypto.randomUUID(),
      project: "midudev 22",
      description: "MiduDev project 22",
      status: "live",
    },
    {
      id: crypto.randomUUID(),
      project: "Header 23",
      description: "This is the Header project 23",
      status: "draft",
    },
    {
      id: crypto.randomUUID(),
      project: "Main Content 24",
      description: "This is the Main Content project 24",
      status: "done",
    },
    {
      id: crypto.randomUUID(),
      project: "midudev 25",
      description: "MiduDev project 25",
      status: "live",
    },
  ]

export const projectsSlice = createSlice({
  name: "projects",
  initialState : DEFAULT_STATE,
  reducers: {
    createProject: (state, action) => {
      const id = crypto.randomUUID();
      state.push({ id, ...action.payload });
    },
    deleteProject: (state, action) => {
      const id = action.payload;
      return state.filter((item) => item.id !== id);
    },
    updateProject: (state, action) => {
      const id = action.payload.id;
      const project = action.payload.project;
      const description = action.payload.description;
      const status = action.payload.status;
      const item = state.find((item) => item.id === id);

      item.project = project;
      item.description = description;
      item.status = status;
    },
  },
});

export const { createProject, deleteProject, updateProject } =
  projectsSlice.actions;
export default projectsSlice.reducer;
