package com.scss.punnyapi.repository;

import com.scss.punnyapi.models.Pun;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PunRepository extends JpaRepository<Pun, Integer> { }
