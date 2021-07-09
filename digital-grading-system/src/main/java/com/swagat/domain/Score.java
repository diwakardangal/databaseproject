package com.swagat.domain;

import javax.persistence.*;

@Entity
@Table(name = "tbl_score")
public class Score {
    @Id
    @GeneratedValue
    private Long id;

    private double score;

    @ManyToOne
    @JoinColumn(name = "pupil_id")
    private User pupil;

    @ManyToOne
    @JoinColumn(name = "exam_id")
    private Exam exam;

    public Score() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public User getPupil() {
        return pupil;
    }

    public void setPupil(User pupil) {
        this.pupil = pupil;
    }

    public Exam getExam() {
        return exam;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }
}
