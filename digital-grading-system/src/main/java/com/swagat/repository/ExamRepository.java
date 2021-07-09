package com.swagat.repository;

import com.swagat.domain.Exam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.Collection;

public interface ExamRepository extends PagingAndSortingRepository<Exam, Long> {

    @Query("FROM Exam b WHERE b.testName LIKE %:searchText% OR b.subject.subjectName LIKE %:searchText% ORDER BY b.testDate ASC")
    Page<Exam> findAllExams(Pageable pageable, @Param("searchText") String searchText);

    @Query("FROM Exam v WHERE v.subject.id =:subject_id")
    Collection<Exam> findExamsBySubject(@Param("subject_id") Long subject_id);
}
