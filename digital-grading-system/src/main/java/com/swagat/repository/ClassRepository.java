package com.swagat.repository;

import com.swagat.domain.Classes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassRepository extends PagingAndSortingRepository<Classes, Long> {
    @Query("FROM Classes c WHERE c.className LIKE %:searchText% ORDER BY c.className ASC")
    Page<Classes> findAllClasses(Pageable pageable, @Param("searchText") String searchText);



}
