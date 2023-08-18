package com.back.api.service;

import org.springframework.stereotype.Service;

@Service
public interface ApiService {

	void saveMoviesFromApi();

	void todayBoxofficeFromApi();
	
	void updateBoxofficeFromApi();

	void recommendMovies();

	void releaseSoonMovies();


}
