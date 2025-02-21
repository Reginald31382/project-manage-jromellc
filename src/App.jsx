import { useState, useEffect } from "react";
import axios from "axios";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(undefined);

  useEffect(() => {
    axios
      .get("http://localhost:5000/projects")
      .then((res) => setProjects(res.data));
    axios.get("http://localhost:5000/tasks").then((res) => setTasks(res.data));
  }, []);

  const handleAddProject = async (projectData) => {
    const res = await axios.post("http://localhost:5000/projects", projectData);
    setProjects([...projects, res.data]);
    setSelectedProjectId(undefined);
  };

  const handleDeleteProject = async () => {
    await axios.delete(`http://localhost:5000/projects/${selectedProjectId}`);
    setProjects(projects.filter((p) => p.id !== selectedProjectId));
    setSelectedProjectId(undefined);
  };

  const handleAddTask = async (text) => {
    const newTask = { text, projectId: selectedProjectId };
    const res = await axios.post("http://localhost:5000/tasks", newTask);
    setTasks([...tasks, res.data]);
  };

  const handleDeleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const selectedProject = projects.find((p) => p._id === selectedProjectId);

  let content = selectedProject ? (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={tasks.filter((task) => task.projectId === selectedProjectId)}
    />
  ) : (
    <NoProjectSelected onStartAddProject={() => setSelectedProjectId(null)} />
  );

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={() => setSelectedProjectId(null)}
        projects={projects}
        onSelectProject={setSelectedProjectId}
        selectedProjectId={selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
