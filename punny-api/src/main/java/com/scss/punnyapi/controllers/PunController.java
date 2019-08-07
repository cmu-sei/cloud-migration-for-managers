package com.scss.punnyapi.controllers;

import com.scss.punnyapi.models.Pun;
import com.scss.punnyapi.repository.PunRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PunController {
    @Autowired
    PunRepository punRepository;

    @GetMapping("/puns")
    public List<Pun> getAllPuns() {
        return punRepository.findAll();
    }
}
