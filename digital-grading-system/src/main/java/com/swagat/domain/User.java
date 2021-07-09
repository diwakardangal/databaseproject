package com.swagat.domain;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "tbl_user")
public class User {
	@Id
	@GeneratedValue
	private Long id;
	@Column(nullable = false)
	private String firstName;
	@Column(nullable = false)
	private String lastName;
	@Column(nullable = false)
	private String email;

	@Column(nullable = false,unique = true)
	private String username;
	@Column(nullable = false)
	private String password;
	@ManyToOne
	@JoinColumn(name = "role_id")
	private Role role;

	@OneToMany(targetEntity = Score.class, mappedBy = "pupil", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<Score> scores;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}
}