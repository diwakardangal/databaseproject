package com.swagat.repository;

import com.swagat.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    @Query("FROM Role WHERE name=:name")
    Role findByRoleName(@Param("name") String name);
}