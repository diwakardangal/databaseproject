package com.swagat.repository;

import com.swagat.domain.ClassPupil;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface ClassPupilRepository extends PagingAndSortingRepository<ClassPupil, Long> {

    @Transactional
    @Modifying
    @Query("DELETE FROM ClassPupil c WHERE c.pupil.id=:id")
    void deleteByPupil(@Param("id") Long id);

    @Query("From ClassPupil c where c.pupil.id=:id")
    ClassPupil findClassByUser(@Param("id") Long id);


}
