package com.swagat.service.impl;

import com.swagat.domain.Score;
import com.swagat.repository.ScoreRepository;
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
public class ScoreServiceImpl implements IService<Score>, IPageService<Score> {
    @Autowired
    private ScoreRepository scoreRepository;

    @Override
    public Collection<Score> findAll() {
        return (Collection<Score>) scoreRepository.findAll();
    }

    @Override
    public Page<Score> findAll(Pageable pageable, Long id) {
        return null;
    }

    @Override
    public Page<Score> findAll(Pageable pageable, String searchText) {
        return scoreRepository.findAllScore(pageable, searchText);
    }

    @Override
    public Score save(Score score) {
        return null;
    }

    @Override
    public Page<Score> findAll(Pageable pageable, String searchText, Long id) {
        return null;
    }

    @Override
    public Page<Score> findNotClass(Pageable pageable) {
        return null;
    }

    @Override
    public Page<Score> findAll(Pageable pageable) {
        return scoreRepository.findAll(pageable);
    }

    @Override
    public Optional<Score> findById(Long id) {
        return scoreRepository.findById(id);
    }

    @Override
    public Score saveOrUpdate(Score score) {
        return scoreRepository.save(score);
    }

    @Override
    public String deleteById(Long id) {
        JSONObject jsonObject = new JSONObject();
        try {
            scoreRepository.deleteById(id);
            jsonObject.put("message", "Book deleted successfully");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonObject.toString();
    }
}
