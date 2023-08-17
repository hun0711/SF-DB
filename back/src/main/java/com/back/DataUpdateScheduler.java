package com.back;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.back.api.service.ApiService;

@Component
public class DataUpdateScheduler {

    @Autowired
    private ApiService apiService;

    @Scheduled(cron = "0 0 0 * * *") // 매일 자정에 실행
    public void cleanupBoxofficeData() {
        apiService.updateBoxofficeData();
    }
}
