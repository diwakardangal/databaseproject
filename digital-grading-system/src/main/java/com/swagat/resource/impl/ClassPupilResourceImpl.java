package com.swagat.resource.impl;

import com.swagat.domain.ClassPupil;
import com.swagat.domain.Classes;
import com.swagat.domain.User;
import com.swagat.repository.ClassPupilRepository;
import com.swagat.resource.Resource;
import com.swagat.service.IPageService;
import com.swagat.service.IService;
import com.swagat.service.impl.ClassServiceImpl;
import com.swagat.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/classpupil")
@CrossOrigin(origins="http://localhost:3000")
public class ClassPupilResourceImpl implements Resource<ClassPupil> {

    @Autowired
    private IService<ClassPupil> classPupilService;

    @Autowired
    private ClassPupilRepository classPupilRepository;

    @Autowired
    private IPageService<ClassPupil> classPupilPageService;

    @Autowired
    private UserServiceImpl userService;


    @Autowired
    private ClassServiceImpl classService;

    @Override
    public ResponseEntity<Page<ClassPupil>> findAll(Pageable pageable, String searchText) {
        return null;
    }

    @Override
    public ResponseEntity<Page<ClassPupil>> findByClass(Pageable pageable, String searchText, Long id) {
        return null;
    }

    @Override
    public ResponseEntity<Page<ClassPupil>> findByClass(Long id, int pageNumber, int pageSize, String sortBy, String sortDir) {
        return null;
    }

    @Override
    public ResponseEntity<Page<ClassPupil>> findAll(int pageNumber, int pageSize, String sortBy, String sortDir) {
        return null;
    }

    @Override
    public ResponseEntity<ClassPupil> findById(Long id) {
        return null;
    }

    @GetMapping("/classbyuser/{user_id}")
    public ResponseEntity<ClassPupil> findClassByUser(@PathVariable Long user_id) {
        return new ResponseEntity<>(classPupilRepository.findClassByUser(user_id), HttpStatus.OK);
    }



    @Override
    public ResponseEntity<ClassPupil> save(ClassPupil classPupil) {
        return null;
    }

    @PostMapping("/assignpupil/{pupil_id}/{class_id}")
    public ResponseEntity<ClassPupil> SaveClassPupil(@PathVariable Long pupil_id, @PathVariable Long class_id) {
        Optional<User> u = userService.findById(pupil_id);
        Optional<Classes> c = classService.findById(class_id);

        ClassPupil cp = new ClassPupil();
        cp.setPupil(u.get());
        cp.setClasses(c.get());

        return new ResponseEntity<>(classPupilService.saveOrUpdate(cp), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ClassPupil> update(ClassPupil classPupil) {
        return null;
    }

    @Override
    public ResponseEntity<String> deleteById(Long id) {
        return new ResponseEntity<>(classPupilService.deleteById(id), HttpStatus.OK);
    }


}
