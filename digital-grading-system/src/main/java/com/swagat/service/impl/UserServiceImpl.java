package com.swagat.service.impl;

import com.swagat.domain.User;
import com.swagat.repository.RoleRepository;
import com.swagat.repository.UserRepository;
import com.swagat.service.IPageService;
import com.swagat.service.IService;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class UserServiceImpl implements IService<User>, IPageService<User> {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Override
	public Collection<User> findAll() {
		return userRepository.findAll();
	}

	@Override
	public Page<User> findAll(Pageable pageable, String searchText) {
		return userRepository.findAllUsers(pageable, searchText);
	}

	@Override
	public Page<User> findAll(Pageable pageable, Long id) {
		return userRepository.findByClass(pageable,id);
	}


	public Page<User> findNotClass(Pageable pageable) {
		return userRepository.findNotClass(pageable);
	}

	@Override
	public Page<User> findAll(Pageable pageable, String searchText, Long id) {
		return userRepository.findByClassSearch(pageable, searchText,id);
	}

	@Override
	public Page<User> findAll(Pageable pageable) {
		return userRepository.findAll(pageable);
	}


	@Override
	public Optional<User> findById(Long id) {
		return userRepository.findById(id);
	}

	@Override
	public User saveOrUpdate(User user) {
		return userRepository.saveAndFlush(user);
	}

	@Override
	public User save(User user) {
		return null;
	}



	@Override
	public String deleteById(Long id) {
		JSONObject jsonObject = new JSONObject();
		try {
			userRepository.deleteById(id);
			jsonObject.put("message", "User deleted successfully");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return jsonObject.toString();
	}

}