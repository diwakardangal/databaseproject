package com.swagat.service.impl;

import com.swagat.domain.Subject;
import com.swagat.repository.SubjectRepository;
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
public class SubjectServiceImpl implements IService<Subject>, IPageService<Subject> {
    @Autowired
    private SubjectRepository subjectRepository;

    @Override
    public Collection<Subject> findAll() {
        return (Collection<Subject>) subjectRepository.findAll();
    }

    @Override
    public Page<Subject> findAll(Pageable pageable, Long id) {
        return null;
    }

    @Override
    public Page<Subject> findAll(Pageable pageable, String searchText) {
        return subjectRepository.findAllSubjects(pageable, searchText);
    }

    @Override
    public Subject save(Subject subject) {
        return null;
    }

    @Override
    public Page<Subject> findAll(Pageable pageable, String searchText, Long id) {
        return null;
    }

    @Override
    public Page<Subject> findNotClass(Pageable pageable) {
        return null;
    }

    @Override
    public Page<Subject> findAll(Pageable pageable) {
        return subjectRepository.findAll(pageable);
    }

    @Override
    public Optional<Subject> findById(Long id) {
        return subjectRepository.findById(id);
    }

    @Override
    public Subject saveOrUpdate(Subject subject) {
        return subjectRepository.save(subject);
    }

    @Override
    public String deleteById(Long id) {
        JSONObject jsonObject = new JSONObject();
        try {
            subjectRepository.deleteById(id);
            jsonObject.put("message", "Book deleted successfully");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonObject.toString();
    }
}
