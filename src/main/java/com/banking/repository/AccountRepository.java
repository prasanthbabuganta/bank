package com.banking.repository;

import com.banking.entity.Account;
import com.banking.entity.User;
import com.banking.entity.enums.AccountStatus;
import com.banking.entity.enums.AccountType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByAccountNumber(String accountNumber);
    List<Account> findByUser(User user);
    List<Account> findByUserAndStatus(User user, AccountStatus status);
    List<Account> findByUserAndAccountType(User user, AccountType accountType);
    boolean existsByAccountNumber(String accountNumber);
}
