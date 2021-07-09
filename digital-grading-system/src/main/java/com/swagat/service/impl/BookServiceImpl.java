package com.swagat.service.impl;

import com.swagat.domain.Book;
import com.swagat.repository.BookRepository;
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
public class BookServiceImpl implements IService<Book>, IPageService<Book> {

	@Autowired
	private BookRepository bookRepository;
	
	@Override
	public Collection<Book> findAll() {
		return (Collection<Book>) bookRepository.findAll();
	}

	@Override
	public Page<Book> findAll(Pageable pageable, Long id) {
		return null;
	}

	@Override
	public Page<Book> findAll(Pageable pageable, String searchText) {
		return bookRepository.findAllBooks(pageable, searchText);
	}

	@Override
	public Book save(Book book) {
		return null;
	}

	@Override
	public Page<Book> findAll(Pageable pageable, String searchText, Long id) {
		return null;
	}

	@Override
	public Page<Book> findNotClass(Pageable pageable) {
		return null;
	}

	@Override
	public Page<Book> findAll(Pageable pageable) {
		return bookRepository.findAll(pageable);
	}

	@Override
	public Optional<Book> findById(Long id) {
		return bookRepository.findById(id);
	}

	@Override
	public Book saveOrUpdate(Book book) {
		return bookRepository.save(book);
	}

	@Override
	public String deleteById(Long id) {
		JSONObject jsonObject = new JSONObject();
		try {
			bookRepository.deleteById(id);
			jsonObject.put("message", "Book deleted successfully");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return jsonObject.toString();
	}

}
