package com.swagat.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IPageService<T> {
	Page<T> findAll(Pageable pageable, String searchText);
	Page<T> findAll(Pageable pageable, String searchText, Long id);
	Page<T> findAll(Pageable pageable);
	Page<T> findNotClass(Pageable pageable);
	Page<T> findAll(Pageable pageable, Long id);
}
