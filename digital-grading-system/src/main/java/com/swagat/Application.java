package com.swagat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.swagat.domain.Book;
import com.swagat.domain.Role;
import com.swagat.domain.User;
import com.swagat.service.IService;

@SpringBootApplication
public class Application implements CommandLineRunner {
	@Autowired
	private IService<User> userService;

	@Autowired
	private IService<Role> roleService;

	@Autowired
	private IService<Book> bookService;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		if(roleService.findAll().isEmpty()) {
			roleService.saveOrUpdate(new Role(1L, "admin"));
			roleService.saveOrUpdate(new Role(2L, "teacher"));
			roleService.saveOrUpdate(new Role(3L, "pupil"));
		}

		if(userService.findAll().isEmpty()) {
			User user1 = new User();
			user1.setEmail("test@user.com");
			user1.setUsername("abhis");
			user1.setFirstName("abhishek");
			user1.setLastName("bhandari");
			user1.setRole(roleService.findById(1L).get());
			user1.setPassword(new BCryptPasswordEncoder().encode("testuser"));
			userService.saveOrUpdate(user1);

			User user2 = new User();
			user2.setEmail("swagat@gyawali.com");
			user2.setUsername("swagat");
			user2.setFirstName("swagat");
			user2.setLastName("gyawali");
			user2.setRole(roleService.findById(1L).get());
			user2.setPassword(new BCryptPasswordEncoder().encode("testuser"));
			userService.saveOrUpdate(user2);

			User user3 = new User();
			user3.setEmail("swagat@gyawali.com");
			user3.setUsername("diwakar");
			user3.setFirstName("diwakar");
			user3.setLastName("dangal");
			user3.setRole(roleService.findById(1L).get());
			user3.setPassword(new BCryptPasswordEncoder().encode("diwakar"));
			userService.saveOrUpdate(user3);
		}


	}

}
