package com.swagat.resource.impl;

import com.swagat.domain.Classes;
import com.swagat.resource.Resource;
import com.swagat.service.IPageService;
import com.swagat.service.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/class")
@CrossOrigin(origins="http://localhost:3000")
public class ClassResourceImpl implements Resource<Classes> {

    @Autowired
    private IService<Classes> classesService;

    @Autowired
    private IPageService<Classes> classPageService;

    @Override
    public ResponseEntity<Page<Classes>> findAll(Pageable pageable, String searchText) {
        return new ResponseEntity<>(classPageService.findAll(pageable, searchText), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Page<Classes>> findByClass(Pageable pageable, String searchText, Long id) {
        return null;
    }

    @Override
    public ResponseEntity<Page<Classes>> findByClass(Long id, int pageNumber, int pageSize, String sortBy, String sortDir) {
        return null;
    }

    @Override
    public ResponseEntity<Page<Classes>> findAll(int pageNumber, int pageSize, String sortBy, String sortDir) {
        return new ResponseEntity<>(classPageService.findAll(
                PageRequest.of(
                        pageNumber, pageSize,
                        sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
                )
        ), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Classes> findById(Long id) {
        return new ResponseEntity<>(classesService.findById(id).get(), HttpStatus.OK);
    }

    @GetMapping("/allclasses")
    public ResponseEntity<Collection<Classes>> findAllClasses() {
        return new ResponseEntity<>(classesService.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Classes> save(Classes classes) {
        return new ResponseEntity<>(classesService.saveOrUpdate(classes), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Classes> update(Classes classes) {
        return new ResponseEntity<>(classesService.saveOrUpdate(classes), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> deleteById(Long id) {
        return new ResponseEntity<>(classesService.deleteById(id), HttpStatus.OK);
    }

}
