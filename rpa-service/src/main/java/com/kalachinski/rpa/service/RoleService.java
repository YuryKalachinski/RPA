package com.kalachinski.rpa.service;

import com.kalachinski.rpa.model.Role;

public interface RoleService {

    Role findByCode(String code);

    Role findByDefaultCode();
}
