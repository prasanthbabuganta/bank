package com.banking.repository;

import com.banking.entity.Account;
import com.banking.entity.Transaction;
import com.banking.entity.enums.TransactionStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Optional<Transaction> findByTransactionReference(String transactionReference);

    Page<Transaction> findByFromAccountOrToAccount(Account fromAccount, Account toAccount, Pageable pageable);

    List<Transaction> findByFromAccountAndCreatedAtBetween(
            Account account,
            LocalDateTime startDate,
            LocalDateTime endDate
    );

    @Query("SELECT t FROM Transaction t WHERE (t.fromAccount = :account OR t.toAccount = :account) " +
           "AND t.createdAt BETWEEN :startDate AND :endDate ORDER BY t.createdAt DESC")
    List<Transaction> findAccountTransactionsBetween(
            Account account,
            LocalDateTime startDate,
            LocalDateTime endDate
    );

    long countByFromAccountAndStatusAndCreatedAtAfter(
            Account account,
            TransactionStatus status,
            LocalDateTime after
    );
}
