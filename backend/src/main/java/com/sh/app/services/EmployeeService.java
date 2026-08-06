package com.sh.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.sh.app.entity.Employee;
import com.sh.app.respositeries.EmployeeRepo;

@Service
public class EmployeeService {
	
	private EmployeeRepo employeeRepo;
	
	public EmployeeService(EmployeeRepo employeeRepo) {
		super();
		this.employeeRepo = employeeRepo;
	}

	public List<Employee> getAllEmployes(){
		return employeeRepo.findAll();
	}
	
	public Employee getEmployee(int id) {
		
//	Optional<Employee>	 ref = employeeRepo.findById(id);
//	if(ref != null) {
//		Employee e = ref.get();
//		return e;
//	}
//	else {
//		return null;
//	}
		return employeeRepo.findById(id).orElse(null);
	}
	
	public void  deleteEmploye(Employee ref) {
		employeeRepo.delete(ref);
	}
	
	public Employee addEmployee(Employee ref) {
		return employeeRepo.save(ref);
	}

}
