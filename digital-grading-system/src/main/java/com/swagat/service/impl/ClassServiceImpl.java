package com.swagat.service.impl;

import com.swagat.domain.Classes;
import com.swagat.repository.ClassRepository;
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
public class ClassServiceImpl implements IService<Classes>, IPageService<Classes> {

    @Autowired
    private ClassRepository classRepository;

    @Override
    public Collection<Classes> findAll() {
        return (Collection<Classes>) classRepository.findAll();
    }

    @Override
    public Page<Classes> findNotClass(Pageable pageable) {
        return null;
    }

    @Override
    public Page<Classes> findAll(Pageable pageable, String searchText, Long id) {
        return null;
    }

    @Override
    public Page<Classes> findAll(Pageable pageable, Long id) {
        return null;
    }

    @Override
    public Page<Classes> findAll(Pageable pageable, String searchText) {
        return classRepository.findAllClasses(pageable, searchText);
    }

    @Override
    public Classes save(Classes classes) {
        return null;
    }

    @Override
    public Page<Classes> findAll(Pageable pageable) {
        return classRepository.findAll(pageable);
    }

    @Override
    public Optional<Classes> findById(Long id) {
        return classRepository.findById(id);
    }

    @Override
    public Classes saveOrUpdate(Classes classes) {
        return classRepository.save(classes);
    }

    @Override
    public String deleteById(Long id) {
        JSONObject jsonObject = new JSONObject();
        try {
            classRepository.deleteById(id);
            jsonObject.put("message", "Class deleted successfully");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonObject.toString();
    }
}
