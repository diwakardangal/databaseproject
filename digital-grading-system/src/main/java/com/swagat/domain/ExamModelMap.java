package com.swagat.domain;

public class ExamModelMap {
    private Long id;
    private String testName;
    private String testDate;
    private Long subject;

    public ExamModelMap(Long id, String testName, String testDate, Long subject) {
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

    public String getTestDate() {
        return testDate;
    }

    public void setTestDate(String testDate) {
        this.testDate = testDate;
    }

    public Long getSubject() {
        return subject;
    }

    public void setSubject(Long subject) {
        this.subject = subject;
    }
}
