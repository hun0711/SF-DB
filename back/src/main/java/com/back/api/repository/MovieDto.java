package com.back.api.repository;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class MovieDto {

    private int movieNo; // pk
    private String movieId; //고유코드
    private String movieSeq; //고유코드
    private String title; // 제목
    private String titleOrg; // 원제
    private String prodYear; // 제작연도
    private String nation; // 국가
    private String runtime; // 상영시간
    private String rating; // 등급
    private String repRlsDate; // 개봉일

    



}
