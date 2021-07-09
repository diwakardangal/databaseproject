package com.swagat.repository;

import com.swagat.domain.Subject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.Collection;

public interface SubjectRepository extends PagingAndSortingRepository<Subject, Long> {

    @Query("FROM Subject b WHERE b.subjectName LIKE %:searchText% OR b.teacher.firstName LIKE %:searchText% OR  b.teacher.lastName LIKE %:searchText% or b.classes.className LIKE %:searchText% ORDER BY b.subjectName ASC")
    Page<Subject> findAllSubjects(Pageable pageable, @Param("searchText") String searchText);

    @Query("FROM Subject b WHERE b.classes.id =:id")
    Collection<Subject> findSubjectByClass(@Param("id") Long id);

    @Query("FROM Subject b WHERE b.teacher.id =:id")
    Collection<Subject> findSubjectByTeacher(@Param("id") Long id);
}
