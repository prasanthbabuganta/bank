package com.banking.repository;

import com.banking.entity.Loan;
import com.banking.entity.User;
import com.banking.entity.enums.LoanStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
    Optional<Loan> findByLoanNumber(String loanNumber);
    List<Loan> findByUser(User user);
    List<Loan> findByUserAndStatus(User user, LoanStatus status);
    boolean existsByLoanNumber(String loanNumber);
}
