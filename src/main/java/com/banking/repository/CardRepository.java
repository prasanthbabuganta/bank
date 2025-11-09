package com.banking.repository;

import com.banking.entity.Account;
import com.banking.entity.Card;
import com.banking.entity.enums.CardStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
    Optional<Card> findByCardNumber(String cardNumber);
    List<Card> findByAccount(Account account);
    List<Card> findByAccountAndStatus(Account account, CardStatus status);
    boolean existsByCardNumber(String cardNumber);
}
