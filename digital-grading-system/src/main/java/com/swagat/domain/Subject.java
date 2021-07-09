package com.swagat.domain;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "tbl_subject")
public class Subject {
    @Id
    @GeneratedValue
    private Long id;

    private String subjectName;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private Classes classes;

    @OneToOne
    @JoinColumn(name = "teacher_id")
    private User teacher;

    @OneToMany(targetEntity = Exam.class, mappedBy = "subject", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Exam> exam;

    public Subject() {
    }

    public Subject(Long id, String subjectName, Classes classes, User teacher) {
        this.id = id;
        this.subjectName = subjectName;
        this.classes = classes;
        this.teacher = teacher;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public Classes getClasses() {
        return classes;
    }

    public void setClasses(Classes classes) {
        this.classes = classes;
    }

    public User getTeacher() {
        return teacher;
    }

    public void setTeacher(User teacher) {
        this.teacher = teacher;
    }
}
