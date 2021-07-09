package com.swagat.resource.impl;

import com.swagat.domain.Exam;
import com.swagat.domain.Score;
import com.swagat.domain.ScoreModelMap;
import com.swagat.domain.User;
import com.swagat.repository.ScoreRepository;
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
@RequestMapping("/scores")
@CrossOrigin(origins="http://localhost:3000")
public class ScoreResourceImpl implements Resource<Score> {
    @Autowired
    private IService<Score> scoreIService;

    @Autowired
    private ScoreRepository scoreRepository;

    @Autowired
    private IService<Exam> examIService;

    @Autowired
    private IService<User> userIService;

    @Autowired
    private IPageService<Score> scoreIPageService;

    @Override
    public ResponseEntity<Page<Score>> findAll(Pageable pageable, String searchText) {
        return new ResponseEntity<>(scoreIPageService.findAll(pageable, searchText), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Page<Score>> findByClass(Pageable pageable, String searchText, Long id) {
        return null;
    }

    @Override
    public ResponseEntity<Page<Score>> findByClass(Long id, int pageNumber, int pageSize, String sortBy, String sortDir) {
        return null;
    }

    @Override
    public ResponseEntity<Page<Score>> findAll(int pageNumber, int pageSize, String sortBy, String sortDir) {
        return new ResponseEntity<>(scoreIPageService.findAll(
                PageRequest.of(
                        pageNumber, pageSize,
                        sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
                )
        ), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Score> findById(Long id) {
        return new ResponseEntity<>(scoreIService.findById(id).get(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Score> save(Score score) {
        return new ResponseEntity<>(scoreIService.saveOrUpdate(score), HttpStatus.CREATED);
    }

    @PostMapping("/save_score")
    public ResponseEntity<Score> saveExam(@RequestBody ScoreModelMap scoreModelMap) {

        Optional<User> pupil = userIService.findById(scoreModelMap.getPupil());
        Optional<Exam> exam = examIService.findById(scoreModelMap.getExam());

        Score sc = scoreRepository.findScoreByPupilExam(pupil.get().getId(), exam.get().getId());
        if(sc != null){
            Score score = new Score();
            score.setId(sc.getId());
            score.setScore(scoreModelMap.getScore());
            score.setPupil(pupil.get());
            score.setExam(exam.get());
            return new ResponseEntity<>(scoreIService.saveOrUpdate(score), HttpStatus.CREATED);
        }else{
            Score score = new Score();
            score.setScore(scoreModelMap.getScore());
            score.setPupil(pupil.get());
            score.setExam(exam.get());
            return new ResponseEntity<>(scoreIService.saveOrUpdate(score), HttpStatus.CREATED);
        }


    }

    @PutMapping("/update_score")
    public ResponseEntity<Score> updateExam(@RequestBody ScoreModelMap scoreModelMap) {
        Optional<User> pupil = userIService.findById(scoreModelMap.getPupil());
        Optional<Exam> exam = examIService.findById(scoreModelMap.getExam());

        Score score = new Score();
        score.setId(scoreModelMap.getId());
        score.setScore(scoreModelMap.getScore());
        score.setPupil(pupil.get());
        score.setExam(exam.get());

        return new ResponseEntity<>(scoreIService.saveOrUpdate(score), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Score> update(Score score) {
        return new ResponseEntity<>(scoreIService.saveOrUpdate(score), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> deleteById(Long id) {
        return new ResponseEntity<>(scoreIService.deleteById(id), HttpStatus.OK);
    }


    @GetMapping("/scorebystudent/{user_id}")
    public  ResponseEntity<Collection<Score>> scorebystudent(@PathVariable Long user_id) {
        Collection<Score> score = scoreRepository.findScoreByPupil(user_id);

        int count = 0;
        for (Score s : score)
        {

        }


        return new ResponseEntity<>(scoreRepository.findScoreByPupil(user_id), HttpStatus.OK);
    }



}
