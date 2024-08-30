import React, { useEffect, useState } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '../services/api';
import { Project } from '../types/types';

const ProjectManagement: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Partial<Project>>({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectResponse = await getProjects();
        setProjects(projectResponse.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleCreateProject = async () => {
    try {
      const createdProjectResponse = await createProject(newProject as Project);
      setProjects([...projects, createdProjectResponse.data]);
      setNewProject({});
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleUpdateProject = async (id: number, updatedProject: Project) => {
    try {
      const updatedProjectResponse = await updateProject(id, updatedProject);
      setProjects(projects.map(project => (project.id === id ? updatedProjectResponse.data : project)));
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleDeleteProject = async (id: number) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter(project => project.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div>
      <h1>Gestión de Proyectos</h1>
      {/* Formulario para crear nuevo proyecto */}
      <div>
        <input
          type="text"
          placeholder="Nombre del Proyecto"
          value={newProject.name || ''}
          onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
        />
        <textarea
          placeholder="Descripción del Proyecto"
          value={newProject.description || ''}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
        />
        <button onClick={handleCreateProject}>Crear Proyecto</button>
      </div>

      {/* Lista de proyectos */}
      <div>
        <h2>Lista de Proyectos</h2>
        {projects.map(project => (
          <div key={project.id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <button onClick={() => handleUpdateProject(project.id, project)}>Editar</button>
            <button onClick={() => handleDeleteProject(project.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManagement;
export {};