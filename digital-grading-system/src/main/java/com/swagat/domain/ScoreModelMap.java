package com.swagat.domain;

public class ScoreModelMap {
    private Long id;
    private double score;
    private Long pupil;
    private Long exam;

    public ScoreModelMap(Long id, double score, Long pupil, Long exam) {
        this.id = id;
        this.score = score;
        this.pupil = pupil;
        this.exam = exam;
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

    public Long getPupil() {
        return pupil;
    }

    public void setPupil(Long pupil) {
        this.pupil = pupil;
    }

    public Long getExam() {
        return exam;
    }

    public void setExam(Long exam) {
        this.exam = exam;
    }
}
