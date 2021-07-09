package com.swagat.service;

import java.util.Collection;
import java.util.Optional;

public interface IService<T> {
	Collection<T> findAll();
	
	Optional<T> findById(Long id);
	
	T saveOrUpdate(T t);


	T save(T t);
	
	String deleteById(Long id);
}
