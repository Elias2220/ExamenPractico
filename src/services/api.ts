import axios from 'axios';
import { Task, Project, Employee } from '../types/types';

const API_URL = 'http://localhost:3001/api';

// Task API Calls
export const getTasks = async () => axios.get<Task[]>(`${API_URL}/tasks`);
export const createTask = async (task: Task) => axios.post(`${API_URL}/tasks`, task);
export const updateTask = async (id: number, task: Task) => axios.put(`${API_URL}/tasks/${id}`, task);
export const deleteTask = async (id: number) => axios.delete(`${API_URL}/tasks/${id}`);

// Project API Calls
export const getProjects = async () => axios.get<Project[]>(`${API_URL}/projects`);
export const createProject = async (project: Project) => axios.post(`${API_URL}/projects`, project);
export const updateProject = async (id: number, project: Project) => axios.put(`${API_URL}/projects/${id}`, project);
export const deleteProject = async (id: number) => axios.delete(`${API_URL}/projects/${id}`);

// Employee API Calls
export const getEmployees = async () => axios.get<Employee[]>(`${API_URL}/employees`);
export const createEmployee = async (employee: Employee) => axios.post(`${API_URL}/employees`, employee);
export const updateEmployee = async (id: number, employee: Employee) => axios.put(`${API_URL}/employees/${id}`, employee);
export const deleteEmployee = async (id: number) => axios.delete(`${API_URL}/employees/${id}`);
