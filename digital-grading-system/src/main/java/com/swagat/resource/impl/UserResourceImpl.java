package com.swagat.resource.impl;

import com.swagat.config.JwtTokenProvider;
import com.swagat.domain.Role;
import com.swagat.domain.User;
import com.swagat.repository.RoleRepository;
import com.swagat.repository.UserRepository;
import com.swagat.resource.Resource;
import com.swagat.service.IPageService;
import com.swagat.service.IService;
import com.swagat.service.impl.RoleServiceImpl;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins="http://localhost:3000")
public class UserResourceImpl implements Resource<User> {

	private static Logger log = LoggerFactory.getLogger(UserResourceImpl.class);

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private IService<User> userService;


	@Autowired
	private RoleServiceImpl roleService;

	@Autowired
	private IPageService<User> userPageService;

	@Override
	public ResponseEntity<Page<User>> findAll(Pageable pageable, String searchText) {
		return new ResponseEntity<>(userPageService.findAll(pageable, searchText), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Page<User>> findAll(int pageNumber, int pageSize, String sortBy, String sortDir) {
		return new ResponseEntity<>(userPageService.findAll(
				PageRequest.of(
						pageNumber, pageSize,
						sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
				)
		), HttpStatus.OK);
	}

	public ResponseEntity<Page<User>> findByClass(Pageable pageable, String searchText, Long id) {
		return new ResponseEntity<>(userPageService.findAll(pageable, searchText,id), HttpStatus.OK);
	}

	public ResponseEntity<Page<User>> findByClass(Long id, int pageNumber, int pageSize, String sortBy, String sortDir) {
		return new ResponseEntity<>(userPageService.findAll(
				PageRequest.of(
						pageNumber, pageSize,
						sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
				),id
		), HttpStatus.OK);
	}

	@GetMapping("/unassignedpupil")
	public ResponseEntity<Page<User>> findNotClass(int pageNumber, int pageSize, String sortBy, String sortDir) {
		return new ResponseEntity<>(userPageService.findNotClass(
				PageRequest.of(
						pageNumber, pageSize,
						sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
				)
		), HttpStatus.OK);
	}




	@Override
	public ResponseEntity<User> findById(Long id) {
		return new ResponseEntity<>(userService.findById(id).get(), HttpStatus.OK);
	}

	@GetMapping("/checkusername/{username}")
	public ResponseEntity<User> findByUsername(@PathVariable String username) {
		return new ResponseEntity<>(userRepository.findByUsername(username), HttpStatus.OK);
	}

	@GetMapping("/checkemail/{email}")
	public ResponseEntity<User> findByEmail(@PathVariable String email) {
		return new ResponseEntity<>(userRepository.findByEmail(email), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<User> save(User user) {
		return new ResponseEntity<>(userService.save(user), HttpStatus.CREATED);
	}

	@PostMapping("/save_user/{role}")
	public ResponseEntity<User> saveuser(@PathVariable String role, @RequestBody User user) {
		Role roleObj = roleRepository.findByRoleName(role);
		user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
		user.setRole(roleObj);
		return new ResponseEntity<>(userService.saveOrUpdate(user), HttpStatus.CREATED);
	}
	@PutMapping("/update_user/{role}")
	public ResponseEntity<User> updateuser(@PathVariable String role, @RequestBody User user) {
		Role roleObj = roleRepository.findByRoleName(role);
		user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
		user.setRole(roleObj);

		return new ResponseEntity<>(userService.saveOrUpdate(user), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<User> update(User user) {
		return new ResponseEntity<>(userService.saveOrUpdate(user), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<String> deleteById(Long id) {
		return new ResponseEntity<>(userService.deleteById(id), HttpStatus.OK);
	}

	@GetMapping("/roles")
	public  ResponseEntity<Collection<Role>> findAllRoles() {
		Collection<Role> roleList = roleService.findAll();
		return new ResponseEntity<>(roleList, HttpStatus.OK);
	}

	@GetMapping("/roles/{role_id}")
	public  ResponseEntity<Optional<Role>> findRoleById(@PathVariable Long role_id) {
		Optional<Role> roleList = roleService.findById(role_id);
		return new ResponseEntity<>(roleList, HttpStatus.OK);
	}


	@GetMapping(value = "/getbyrole/{role_id}")
	public ResponseEntity<Collection<User>> getUsersByRole(@PathVariable int role_id){
		List<User> userList = userRepository.findByRole(role_id);
		return new ResponseEntity<Collection<User>>(userList,HttpStatus.OK);
	}

	@PostMapping(value = "/authenticate", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<String> authenticate(@RequestBody User user) {
		log.info("UserResourceImpl : authenticate");
		JSONObject jsonObject = new JSONObject();
		try {
			Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
			if (authentication.isAuthenticated()) {
				String username = user.getUsername();
				jsonObject.put("name", authentication.getName());
				jsonObject.put("id", userRepository.findByUsername(username).getId());
				jsonObject.put("role", userRepository.findByUsername(username).getRole().getName());
				jsonObject.put("authorities", authentication.getAuthorities());
				jsonObject.put("token", tokenProvider.createToken(username, userRepository.findByUsername(username).getRole()));
				return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);
			}
		} catch (JSONException e) {
			try {
				jsonObject.put("exception", e.getMessage());
			} catch (JSONException e1) {
				e1.printStackTrace();
			}
			return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
		}
		return null;
	}
}