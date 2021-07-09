package com.swagat.resource.impl;


import com.swagat.domain.Classes;
import com.swagat.domain.Subject;
import com.swagat.domain.SubjectModelMap;
import com.swagat.domain.User;
import com.swagat.repository.SubjectRepository;
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
import java.util.Optional;

@RestController
@RequestMapping("/subjects")
@CrossOrigin(origins="http://localhost:3000")
public class SubjectResourceImpl implements Resource<Subject> {

    @Autowired
    private IService<Subject> subjectService;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private IPageService<Subject> subjectPageService;

    @Autowired
    private IService<User> userService;

    @Autowired
    private IService<Classes> classesService;

    @Override
    public ResponseEntity<Page<Subject>> findAll(Pageable pageable, String searchText) {
        return new ResponseEntity<>(subjectPageService.findAll(pageable, searchText), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Page<Subject>> findByClass(Pageable pageable, String searchText, Long id) {
        return null;
    }

    @Override
    public ResponseEntity<Page<Subject>> findByClass(Long id, int pageNumber, int pageSize, String sortBy, String sortDir) {
        return null;
    }

    @Override
    public ResponseEntity<Page<Subject>> findAll(int pageNumber, int pageSize, String sortBy, String sortDir) {
        return new ResponseEntity<>(subjectPageService.findAll(
                PageRequest.of(
                        pageNumber, pageSize,
                        sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
                )
        ), HttpStatus.OK);
    }

    @GetMapping("/allSubjects")
    public ResponseEntity<Collection<Subject>> findAllClasses() {
        return new ResponseEntity<>(subjectService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/subjectByTeacher/{id}")
    public ResponseEntity<Collection<Subject>> findSubjectByTeacher(@PathVariable Long id) {
        return new ResponseEntity<>(subjectRepository.findSubjectByTeacher(id), HttpStatus.OK);
    }

    @GetMapping("/subjectbyclass/{id}")
    public ResponseEntity<Collection<Subject>> findSubjectByClass(@PathVariable Long id) {
        return new ResponseEntity<>(subjectRepository.findSubjectByClass(id), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Subject> findById(Long id) {
        return new ResponseEntity<>(subjectService.findById(id).get(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Subject> save(Subject subject) {
        return new ResponseEntity<>(subjectService.saveOrUpdate(subject), HttpStatus.CREATED);
    }

    @PostMapping("/save_subject")
    public ResponseEntity<Subject> saveSubject(@RequestBody SubjectModelMap subjectModelMap) {
        Optional<User> teacher = userService.findById(subjectModelMap.getTeacher_id());
        Optional<Classes> classes = classesService.findById(subjectModelMap.getClass_id());

        Subject subject = new Subject();
        subject.setSubjectName(subjectModelMap.getSubjectName());
        subject.setClasses(classes.get());
        subject.setTeacher(teacher.get());

        return new ResponseEntity<>(subjectService.saveOrUpdate(subject), HttpStatus.CREATED);
    }

    @PutMapping("/update_subject")
    public ResponseEntity<Subject> updateSubject(@RequestBody  SubjectModelMap subjectModelMap) {
        Optional<User> teacher = userService.findById(subjectModelMap.getTeacher_id());
        Optional<Classes> classes = classesService.findById(subjectModelMap.getClass_id());

        Subject subject = new Subject();
        subject.setId(subjectModelMap.getSubject_id());
        subject.setSubjectName(subjectModelMap.getSubjectName());
        subject.setClasses(classes.get());
        subject.setTeacher(teacher.get());

        return new ResponseEntity<>(subjectService.saveOrUpdate(subject), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Subject> update(Subject subject) {
        return new ResponseEntity<>(subjectService.saveOrUpdate(subject), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> deleteById(Long id) {
        return new ResponseEntity<>(subjectService.deleteById(id), HttpStatus.OK);
    }

}

