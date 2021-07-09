package com.swagat.service.impl;

import com.swagat.domain.Exam;
import com.swagat.repository.ExamRepository;
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
public class TestServiceImpl implements IService<Exam>, IPageService<Exam> {
    @Autowired
    private ExamRepository examRepository;

    @Override
    public Collection<Exam> findAll() {
        return (Collection<Exam>) examRepository.findAll();
    }

    @Override
    public Page<Exam> findAll(Pageable pageable, Long id) {
        return null;
    }

    @Override
    public Page<Exam> findAll(Pageable pageable, String searchText) {
        return examRepository.findAllExams(pageable, searchText);
    }

    @Override
    public Exam save(Exam exam) {
        return null;
    }

    @Override
    public Page<Exam> findAll(Pageable pageable, String searchText, Long id) {
        return null;
    }

    @Override
    public Page<Exam> findNotClass(Pageable pageable) {
        return null;
    }

    @Override
    public Page<Exam> findAll(Pageable pageable) {
        return examRepository.findAll(pageable);
    }

    @Override
    public Optional<Exam> findById(Long id) {
        return examRepository.findById(id);
    }

    @Override
    public Exam saveOrUpdate(Exam exam) {
        return examRepository.save(exam);
    }

    @Override
    public String deleteById(Long id) {
        JSONObject jsonObject = new JSONObject();
        try {
            examRepository.deleteById(id);
            jsonObject.put("message", "Book deleted successfully");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonObject.toString();
    }
}
