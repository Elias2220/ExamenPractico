import React, { useEffect, useState } from 'react';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../services/api';
import { Employee } from '../types/types';

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({});

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeeResponse = await getEmployees();
        setEmployees(employeeResponse.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleCreateEmployee = async () => {
    try {
      const createdEmployeeResponse = await createEmployee(newEmployee as Employee);
      setEmployees([...employees, createdEmployeeResponse.data]);
      setNewEmployee({});
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  const handleUpdateEmployee = async (id: number, updatedEmployee: Employee) => {
    try {
      const updatedEmployeeResponse = await updateEmployee(id, updatedEmployee);
      setEmployees(employees.map(employee => (employee.id === id ? updatedEmployeeResponse.data : employee)));
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDeleteEmployee = async (id: number) => {
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter(employee => employee.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div>
      <h1>Gestión de Empleados</h1>
      {/* Formulario para crear nuevo empleado */}
      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={newEmployee.name || ''}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Posición"
          value={newEmployee.position || ''}
          onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={newEmployee.email || ''}
          onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
        />
        <button onClick={handleCreateEmployee}>Crear Empleado</button>
      </div>

      {/* Lista de empleados */}
      <div>
        <h2>Lista de Empleados</h2>
        {employees.map(employee => (
          <div key={employee.id}>
            <h3>{employee.name}</h3>
            <p>Posición: {employee.position}</p>
            <p>Email: {employee.email}</p>
            <button onClick={() => handleUpdateEmployee(employee.id, employee)}>Editar</button>
            <button onClick={() => handleDeleteEmployee(employee.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeManagement;
