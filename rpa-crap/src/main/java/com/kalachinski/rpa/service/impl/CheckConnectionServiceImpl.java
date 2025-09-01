package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.model.Crap;
import com.kalachinski.rpa.model.ErrorConnection;
import com.kalachinski.rpa.repositories.CrapRepo;
import com.kalachinski.rpa.repositories.ErrorConnectionRepo;
import com.kalachinski.rpa.service.CheckConnectionService;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.net.Socket;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.CountDownLatch;

@EnableScheduling
@Transactional
@Service
public class CheckConnectionServiceImpl implements CheckConnectionService {

    private final CrapRepo crapRepo;
    private final ErrorConnectionRepo errorConnectionRepo;
    private CountDownLatch latch;

    public CheckConnectionServiceImpl(CrapRepo crapRepo, ErrorConnectionRepo errorConnectionRepo) {
        this.crapRepo = crapRepo;
        this.errorConnectionRepo = errorConnectionRepo;
    }

    @Scheduled(fixedDelay = 10000)
    @Override
    public void autoCheckConnection() {
        List<Crap> crapList = getActiveCrapList();
        latch = new CountDownLatch(crapList.size());
        for (Crap crap : crapList) {
            new Thread(() -> {
                checkCrapConnection(crap);
            }).start();
        }
        try {
            latch.await();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void manualCheckConnection() {

    }

    private void checkCrapConnection(Crap crap) {
        try (Socket socket = new Socket(crap.getHost(), crap.getPort())) {
            crap.setAvailable(true);
            crap.setLastSuccessCheck(LocalDateTime.now());
            crapRepo.save(crap);
        } catch (IOException e) {
            crap.setAvailable(false);
            var errorConnection = new ErrorConnection()
                    .setCrap(crap)
                    .setErrorTime(LocalDateTime.now())
                    .setErrorDesc(e.getMessage());
            errorConnectionRepo.save(errorConnection);
        } finally {
            latch.countDown();
        }
    }

    private List<Crap> getActiveCrapList() {
        return crapRepo.findAllActive();
    }

}

