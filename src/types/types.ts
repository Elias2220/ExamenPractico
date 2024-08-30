export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'Pendiente' | 'En Proceso' | 'Completada';
    priority: 'Baja' | 'Media' | 'Alta';
    due_date: string;
    project_id: number;
    employee_id: number;
  }
  
  export interface Project {
    id: number;
    name: string;
    description: string;
    start_date: string;
    end_date?: string;
  }
  
  export interface Employee {
    id: number;
    name: string;  // Asegúrate de que `name` combine `first_name` y `last_name`
    position: string;
    email: string;
  }
  