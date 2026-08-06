package com.sh.app.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sh.app.entity.Employee;
import com.sh.app.services.EmployeeService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class EmployeeController {
	
	private EmployeeService employeeService;
	
	
	public EmployeeController(EmployeeService employeeService) {
		super();
		this.employeeService = employeeService;
	}

	@GetMapping("/employees")
	public List<Employee> getAllEmployess(){
		return employeeService.getAllEmployes();
	}
	
	@GetMapping("/employee/{uid}")
	public Employee getEmployeById(@PathVariable("uid") int id) {
		return employeeService.getEmployee(id);
	}
	
	@PostMapping("/employee")
	public Employee createEmployee(@RequestBody Employee ref) {
		return employeeService.addEmployee(ref);
	}
	
	@DeleteMapping("/employee/{id}")
	public String deleteEmployee(@PathVariable int id) {
		Employee ref =  employeeService.getEmployee(id);
		if(ref != null) {
			employeeService.deleteEmploye(ref);
			return "Employee Deleted Succefully";
		}
		else {
			return "Employee with id " +id+ "Does not Exist to Delete";
		}
	}
	
	@PutMapping("/employee")
	public Employee updateEmployee(@RequestBody Employee ref) {
		Employee existing = employeeService.getEmployee(ref.getId());
		if(existing != null) {
			existing.setName(ref.getName());
			existing.setGender(ref.getGender());
			existing.setSalary(ref.getSalary());
			existing.setAge(ref.getAge());
			if (ref.getPassword() != null && !ref.getPassword().isEmpty()) {
				existing.setPassword(ref.getPassword());
			}
			return employeeService.addEmployee(existing);
		}
		else {
			return null;
		}
	}
	
	
}
