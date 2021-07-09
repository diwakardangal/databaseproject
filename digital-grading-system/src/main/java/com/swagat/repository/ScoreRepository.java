package com.swagat.repository;

import com.swagat.domain.Score;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;

public interface ScoreRepository extends JpaRepository<Score, Long> {
    @Query("FROM Score u WHERE u.pupil.firstName LIKE %:searchText% OR u.pupil.lastName LIKE %:searchText% OR u.exam.testName LIKE %:searchText%  ORDER BY u.pupil.firstName ASC")
    Page<Score> findAllScore(Pageable pageable, @Param("searchText") String searchText);

    @Query("FROM Score s where s.pupil.id =:pupil_id and s.exam.id =:exam_id")
    Score findScoreByPupilExam(@Param("pupil_id") Long pupil_id,@Param("exam_id") Long exam_id);

    @Query("FROM Score s where s.pupil.id =:pupil_id")
    Collection<Score> findScoreByPupil(@Param("pupil_id") Long pupil_id);


}
