package com.swagat.repository;

import com.swagat.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	@Query("FROM User WHERE username=:username")
	User findByUsername(@Param("username") String username);

	@Query("FROM User WHERE email=:email")
	User findByEmail(@Param("email") String email);

	@Query("FROM User WHERE role_id=:role_id")
	List<User> findByRole(@Param("role_id") int role_id);

	@Query("FROM User u WHERE u.firstName LIKE %:searchText% OR u.lastName LIKE %:searchText% OR u.email LIKE %:searchText% OR u.username LIKE %:searchText% ORDER BY u.firstName ASC")
	Page<User> findAllUsers(Pageable pageable, @Param("searchText") String searchText);


	@Query("from User a where a.role.id = 3 AND a.id in (select pupil.id from ClassPupil where classes.id = :id) order by a.id asc")
	Page<User> findByClass(Pageable pageable, @Param("id") Long id);

	@Query("from User a where a.role.id = 3 AND (a.firstName LIKE %:searchText% OR a.lastName LIKE %:searchText% OR a.email LIKE %:searchText% ) AND a.id in (select pupil.id from ClassPupil where classes.id = :id) order by a.id asc")
	Page<User> findByClassSearch(Pageable pageable, @Param("searchText") String searchText, @Param("id") Long id);

	@Query("from User a where a.role.id = 3 AND a.id not in (select pupil.id from ClassPupil) order by a.firstName asc")
	Page<User> findNotClass(Pageable pageable);

//	@Query("from User a where a.role.id = 3 AND (a.firstName LIKE %:searchText% OR a.lastName LIKE %:searchText% OR a.email LIKE %:searchText% ) AND a.id in (select pupil.id from ClassPupil where classes.id = :id) order by a.id asc")
//	Page<User> findNotClass(Pageable pageable, @Param("searchText") String searchText, @Param("id") Long id);
}