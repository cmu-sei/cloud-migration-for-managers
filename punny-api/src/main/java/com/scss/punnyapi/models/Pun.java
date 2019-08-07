package com.scss.punnyapi.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "puns")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"created", "lastupdated"}, allowGetters = true)
public class Pun implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer pun_id;

    @NotBlank
    private String pun;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private  Date  created;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private  Date  lastupdated;

    public Integer getPun_id() {
        return pun_id;
    }

    public String getPun() {
        return pun;
    }

    public void setPun(String pun) {
        this.pun = pun;
    }

    public Date getCreated() {
        return created;
    }

    public Date getLastupdated() {
        return lastupdated;
    }
}
