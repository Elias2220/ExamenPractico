import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TaskManagement from './components/TaskManagement';
import EmployeeManagement from './components/EmployeeManagement';
import ProjectManagement from './components/ProjectManagement';
import Home from './components/Home';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/tasks">Gestión de Tareas</Link></li>
            <li><Link to="/employees">Gestión de Empleados</Link></li>
            <li><Link to="/projects">Gestión de Proyectos</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TaskManagement />} />
          <Route path="/employees" element={<EmployeeManagement />} />
          <Route path="/projects" element={<ProjectManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
