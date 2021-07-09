package com.swagat.service.impl;

import com.swagat.domain.ClassPupil;
import com.swagat.repository.ClassPupilRepository;
import com.swagat.repository.UserRepository;
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
public class ClassPupilServiceImpl  implements IService<ClassPupil>, IPageService<ClassPupil> {

    @Autowired
    private ClassPupilRepository classPupilRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Collection<ClassPupil> findAll() {
        return (Collection<ClassPupil>) classPupilRepository.findAll();
    }

    @Override
    public Page<ClassPupil> findNotClass(Pageable pageable) {
        return null;
    }

    @Override
    public Page<ClassPupil> findAll(Pageable pageable, String searchText) {
        return null;
    }

    @Override
    public ClassPupil save(ClassPupil classPupil) {
        return null;
    }

    @Override
    public Page<ClassPupil> findAll(Pageable pageable, String searchText, Long id) {
        return null;
    }

    @Override
    public Page<ClassPupil> findAll(Pageable pageable, Long id) {
        return null;
    }

    @Override
    public Page<ClassPupil> findAll(Pageable pageable) {
        return classPupilRepository.findAll(pageable);
    }

    @Override
    public Optional<ClassPupil> findById(Long id) {
        return classPupilRepository.findById(id);
    }

    @Override
    public ClassPupil saveOrUpdate(ClassPupil classPupil) {
        return classPupilRepository.save(classPupil);
    }

    @Override

    public String deleteById(Long id) {
        JSONObject jsonObject = new JSONObject();
        try {
            classPupilRepository.deleteByPupil(id);
            jsonObject.put("message", "Pupil Deassigned successfully");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonObject.toString();
    }

}
