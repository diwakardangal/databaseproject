package com.swagat.domain;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "tbl_exam")
public class Exam {
    @Id
    @GeneratedValue
    private Long id;

    private String testName;

    private Date testDate;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    @OneToMany(targetEntity = Score.class, mappedBy = "exam", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Score> scores;

    public Exam() {
    }

    public Exam(Long id, String testName, Date testDate, Subject subject) {
        this.id = id;
        this.testName = testName;
        this.testDate = testDate;
        this.subject = subject;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTestName() {
        return testName;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    public Date getTestDate() {
        return testDate;
    }

    public void setTestDate(Date testDate) {
        this.testDate = testDate;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }
}
