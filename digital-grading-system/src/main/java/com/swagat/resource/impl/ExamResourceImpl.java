package com.swagat.resource.impl;

import com.swagat.domain.Exam;
import com.swagat.domain.ExamModelMap;
import com.swagat.domain.Subject;
import com.swagat.repository.ExamRepository;
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

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/exams")
@CrossOrigin(origins="http://localhost:3000")
public class ExamResourceImpl implements Resource<Exam> {
    @Autowired
    private IService<Exam> examService;

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private IService<Subject> subjectService;

    @Autowired
    private IPageService<Exam> examPageService;

    @Override
    public ResponseEntity<Page<Exam>> findAll(Pageable pageable, String searchText) {
        return new ResponseEntity<>(examPageService.findAll(pageable, searchText), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Page<Exam>> findByClass(Pageable pageable, String searchText, Long id) {
        return null;
    }

    @Override
    public ResponseEntity<Page<Exam>> findByClass(Long id, int pageNumber, int pageSize, String sortBy, String sortDir) {
        return null;
    }

    @Override
    public ResponseEntity<Page<Exam>> findAll(int pageNumber, int pageSize, String sortBy, String sortDir) {
        return new ResponseEntity<>(examPageService.findAll(
                PageRequest.of(
                        pageNumber, pageSize,
                        sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
                )
        ), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Exam> findById(Long id) {
        return new ResponseEntity<>(examService.findById(id).get(), HttpStatus.OK);
    }

    @GetMapping("/allexams")
    public  ResponseEntity<Collection<Exam>> findAllTests() {
        return new ResponseEntity<>(examService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/examsbysubject/{subject_id}")
    public  ResponseEntity<Collection<Exam>> findExamsbySubject(@PathVariable Long subject_id) {
        return new ResponseEntity<>(examRepository.findExamsBySubject(subject_id), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Exam> save(Exam exam) {
        return new ResponseEntity<>(examService.saveOrUpdate(exam), HttpStatus.CREATED);
    }

    @PostMapping("/save_exam")
    public ResponseEntity<Exam> saveExam(@RequestBody ExamModelMap examModelMap) {

        Optional<Subject> subject = subjectService.findById(examModelMap.getSubject());

        String testDate = examModelMap.getTestDate();
        DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date date = null;
        try {
             date = formatter.parse(testDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        Exam exam = new Exam();
        exam.setSubject(subject.get());
        exam.setTestName(examModelMap.getTestName());
        exam.setTestDate(date);

        return new ResponseEntity<>(examService.saveOrUpdate(exam), HttpStatus.CREATED);
    }

    @PutMapping("/update_exam")
    public ResponseEntity<Exam> updateExam(@RequestBody ExamModelMap examModelMap) {
        Optional<Subject> subject = subjectService.findById(examModelMap.getSubject());

        String testDate = examModelMap.getTestDate();
        DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date date = null;
        try {
            date = formatter.parse(testDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        Exam exam = new Exam();
        exam.setId(examModelMap.getId());
        exam.setSubject(subject.get());
        exam.setTestName(examModelMap.getTestName());
        exam.setTestDate(date);

        return new ResponseEntity<>(examService.saveOrUpdate(exam), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Exam> update(Exam exam) {
        return new ResponseEntity<>(examService.saveOrUpdate(exam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> deleteById(Long id) {
        return new ResponseEntity<>(examService.deleteById(id), HttpStatus.OK);
    }

}
