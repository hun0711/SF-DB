package com.back;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.back.api.repository.ApiDao;
import com.back.api.service.ApiServiceImpl;

@Component
public class BoxofficeUpdater {

    private final ApiServiceImpl apiServiceImpl;
    private final ApiDao apiDao;

    public BoxofficeUpdater(ApiServiceImpl apiServiceImpl, ApiDao apiDao) {
        this.apiServiceImpl = apiServiceImpl;
        this.apiDao = apiDao;
    }

    // 자정마다 업데이트 실행
    @Scheduled(cron = "0 0 0 * * ?") // 매일 자정에 실행
    @Transactional
    public void updateBoxOfficeAtMidnight() {
    	 // 박스오피스 데이터 삭제
        apiDao.deleteBoxofficeData();

        //새 박스오피스 데이터 가져오기
        apiServiceImpl.saveMoviesFromApi();
    }
}
