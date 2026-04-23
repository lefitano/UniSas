package com.unisas.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/perfis")
public class PerfilController {

    @GetMapping
    public List<Map<String, String>> listar() {
        return List.of(
            Map.of("id", "ALUNO",       "label", "Aluno",       "descricao", "Acesso a conteúdos e atividades"),
            Map.of("id", "PROFESSOR",   "label", "Professor",   "descricao", "Gestão de turmas e conteúdo"),
            Map.of("id", "RESPONSAVEL", "label", "Responsável", "descricao", "Acompanhe seu filho"),
            Map.of("id", "DIRETOR",     "label", "Diretor",     "descricao", "Gestão escolar completa")
        );
    }
}
