package com.swagat.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "tbl_class")
public class Classes {
    @Id
    @GeneratedValue
    private Long id;

    private String className;

    @JsonIgnore
    @OneToMany(targetEntity = ClassPupil.class, mappedBy = "classes", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ClassPupil> childClass;

    @JsonIgnore
    @OneToMany(targetEntity = Subject.class, mappedBy = "teacher", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Subject> subjects;

    public Classes() {
    }

    public Classes(Long id, String className, List<ClassPupil> childClass) {
        this.id = id;
        this.className = className;
        this.childClass = childClass;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public List<ClassPupil> getChildClass() {
        return childClass;
    }

    public void setChildClass(List<ClassPupil> childClass) {
        this.childClass = childClass;
    }
}
