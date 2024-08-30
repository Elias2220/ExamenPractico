import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask, getProjects, getEmployees } from '../services/api';
import { Task, Project, Employee } from '../types/types';

const TaskManagement: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newTask, setNewTask] = useState<Partial<Task>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskResponse = await getTasks();
        setTasks(taskResponse.data); // Aquí extraemos los datos
  
        const projectResponse = await getProjects();
        setProjects(projectResponse.data); // Aquí extraemos los datos
  
        const employeeResponse = await getEmployees();
        setEmployees(employeeResponse.data); // Aquí extraemos los datos
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleCreateTask = async () => {
    try {
      const createdTaskResponse = await createTask(newTask as Task);
      const createdTask = createdTaskResponse.data; // Extraemos los datos de la respuesta de Axios
      setTasks([...tasks, createdTask]); // Añadimos la nueva tarea a la lista de tareas
      setNewTask({}); // Reseteamos el estado de la nueva tarea
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (id: number, updatedTask: Task) => {
    try {
      const updatedTaskResponse = await updateTask(id, updatedTask);
      const updated = updatedTaskResponse.data; // Extraemos los datos de la respuesta de Axios
      setTasks(tasks.map(task => (task.id === id ? updated : task))); // Actualizamos la tarea en la lista
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h1>Gestión de Tareas</h1>

      <div>
        <h2>Crear Nueva Tarea</h2>
        <input
          type="text"
          placeholder="Título"
          value={newTask.title || ''}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newTask.description || ''}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <select
          value={newTask.project_id || ''}
          onChange={(e) => setNewTask({ ...newTask, project_id: parseInt(e.target.value) })}
        >
          <option value="">Seleccionar Proyecto</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        <select
          value={newTask.employee_id || ''}
          onChange={(e) => setNewTask({ ...newTask, employee_id: parseInt(e.target.value) })}
        >
          <option value="">Seleccionar Empleado</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
        <button onClick={handleCreateTask}>Crear Tarea</button>
      </div>

      <div>
        <h2>Lista de Tareas</h2>
        {tasks.map(task => (
          <div key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Proyecto: {projects.find(project => project.id === task.project_id)?.name}</p>
            <p>Asignado a: {employees.find(employee => employee.id === task.employee_id)?.name}</p>
            <button onClick={() => handleUpdateTask(task.id, task)}>Editar</button>
            <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManagement;
