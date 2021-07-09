package com.swagat.domain;

import javax.persistence.*;

@Entity
@Table(name = "tbl_classpupil")
public class ClassPupil {
    @Id
    @GeneratedValue
    private int id;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private Classes classes;

    @OneToOne
    @JoinColumn(name = "pupil_id")
    private User pupil;

    public ClassPupil() {
    }

    public ClassPupil(int id, Classes classes, User pupil) {
        this.id = id;
        this.classes = classes;
        this.pupil = pupil;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Classes getClasses() {
        return classes;
    }

    public void setClasses(Classes classes) {
        this.classes = classes;
    }

    public User getPupil() {
        return pupil;
    }

    public void setPupil(User pupil) {
        this.pupil = pupil;
    }
}