package com.back;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.back.api.repository.ApiDao;

@Component
public class DataCleanupScheduler {

    @Autowired
    private ApiDao movieDao; // 데이터베이스 DAO

    @Scheduled(cron = "0 0 0 * * ?") // 매일 자정에 실행
    public void cleanupBoxofficeData() {
        movieDao.deleteBoxofficeData();
    }
}
