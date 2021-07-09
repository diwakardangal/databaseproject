package com.swagat.domain;

public class SubjectModelMap {
    private Long subject_id;
    private String subjectName;
    private Long teacher_id;
    private Long class_id;

    public SubjectModelMap() {
    }

    public SubjectModelMap(Long subject_id, Long teacher_id, Long class_id,String subjectName) {
        this.subject_id = subject_id;
        this.teacher_id = teacher_id;
        this.class_id = class_id;
        this.subjectName = subjectName;
    }

    public Long getSubject_id() {
        return subject_id;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public void setSubject_id(Long subject_id) {
        this.subject_id = subject_id;
    }

    public Long getTeacher_id() {
        return teacher_id;
    }

    public void setTeacher_id(Long teacher_id) {
        this.teacher_id = teacher_id;
    }

    public Long getClass_id() {
        return class_id;
    }

    public void setClass_id(Long class_id) {
        this.class_id = class_id;
    }
}
