package com.back;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.back.api.controller.ApiController;

@Component
public class BoxofficeUpdater {

    private final ApiController apiController;

    public BoxofficeUpdater(ApiController apiController) {
        this.apiController = apiController;
    }

    // 자정마다 업데이트 실행
    @Scheduled(cron = "0 0 0 * * ?") // 매일 자정에 실행
    public void updateBoxOfficeAtMidnight() {
        apiController.updateBoxofficeFromApi();
    }
}
