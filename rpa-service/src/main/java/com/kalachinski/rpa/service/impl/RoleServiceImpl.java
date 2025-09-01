package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.model.Role;
import com.kalachinski.rpa.repositories.RoleRepo;
import com.kalachinski.rpa.service.RoleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

    private static final String DEFAULT_ROLE_CODE = "ROLE_VIEWER";
    private static final String ROLE_WITH_CODE_IS_NOT_FOUND = "Role with code is not found: ";

    private final RoleRepo roleRepo;

    public RoleServiceImpl(RoleRepo roleRepo) {
        this.roleRepo = roleRepo;
    }

    @Override
    public Role findByCode(String code) {
        return roleRepo.findByCode(code)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, ROLE_WITH_CODE_IS_NOT_FOUND + code));
    }

    @Override
    public Role findByDefaultCode() {
        return findByCode(DEFAULT_ROLE_CODE);
    }
}
