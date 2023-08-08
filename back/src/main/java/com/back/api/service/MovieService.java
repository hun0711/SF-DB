package com.back.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface MovieService {

	void fetchAndSaveMovieInfo(String apiKey, List<String> movieIds);

}
