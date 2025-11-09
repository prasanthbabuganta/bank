package com.banking.service;

import com.banking.dto.transaction.TransactionDTO;
import com.banking.dto.transaction.TransferRequest;
import com.banking.entity.Account;
import com.banking.entity.Transaction;
import com.banking.entity.User;
import com.banking.entity.enums.AccountStatus;
import com.banking.entity.enums.TransactionStatus;
import com.banking.exception.BadRequestException;
import com.banking.exception.InsufficientBalanceException;
import com.banking.exception.ResourceNotFoundException;
import com.banking.repository.AccountRepository;
import com.banking.repository.TransactionRepository;
import com.banking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;

    @Transactional
    public TransactionDTO transfer(TransferRequest request) {
        Account fromAccount = accountRepository.findByAccountNumber(request.getFromAccountNumber())
                .orElseThrow(() -> new ResourceNotFoundException("Source account not found"));

        Account toAccount = accountRepository.findByAccountNumber(request.getToAccountNumber())
                .orElseThrow(() -> new ResourceNotFoundException("Destination account not found"));

        User currentUser = getCurrentUser();
        if (!fromAccount.getUser().getId().equals(currentUser.getId())) {
            throw new BadRequestException("Unauthorized transaction");
        }

        if (fromAccount.getStatus() != AccountStatus.ACTIVE) {
            throw new BadRequestException("Source account is not active");
        }

        if (toAccount.getStatus() != AccountStatus.ACTIVE) {
            throw new BadRequestException("Destination account is not active");
        }

        if (fromAccount.getBalance().compareTo(request.getAmount()) < 0) {
            throw new InsufficientBalanceException("Insufficient balance in source account");
        }

        String transactionRef = UUID.randomUUID().toString();
        BigDecimal fee = BigDecimal.ZERO;

        fromAccount.setBalance(fromAccount.getBalance().subtract(request.getAmount()));
        fromAccount.setLastTransactionAt(LocalDateTime.now());

        toAccount.setBalance(toAccount.getBalance().add(request.getAmount()));
        toAccount.setLastTransactionAt(LocalDateTime.now());

        Transaction transaction = Transaction.builder()
                .transactionReference(transactionRef)
                .fromAccount(fromAccount)
                .toAccount(toAccount)
                .type(request.getType())
                .amount(request.getAmount())
                .fee(fee)
                .balanceAfter(fromAccount.getBalance())
                .status(TransactionStatus.COMPLETED)
                .description(request.getDescription())
                .completedAt(LocalDateTime.now())
                .build();

        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);
        transaction = transactionRepository.save(transaction);

        return mapToTransactionDTO(transaction);
    }

    public Page<TransactionDTO> getMyTransactions(String accountNumber, Pageable pageable) {
        Account account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found"));

        User currentUser = getCurrentUser();
        if (!account.getUser().getId().equals(currentUser.getId())) {
            throw new BadRequestException("Unauthorized access");
        }

        return transactionRepository.findByFromAccountOrToAccount(account, account, pageable)
                .map(this::mapToTransactionDTO);
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private TransactionDTO mapToTransactionDTO(Transaction transaction) {
        return TransactionDTO.builder()
                .id(transaction.getId())
                .transactionReference(transaction.getTransactionReference())
                .fromAccountNumber(transaction.getFromAccount() != null ? transaction.getFromAccount().getAccountNumber() : null)
                .toAccountNumber(transaction.getToAccount() != null ? transaction.getToAccount().getAccountNumber() : null)
                .type(transaction.getType())
                .amount(transaction.getAmount())
                .fee(transaction.getFee())
                .balanceAfter(transaction.getBalanceAfter())
                .status(transaction.getStatus())
                .description(transaction.getDescription())
                .createdAt(transaction.getCreatedAt())
                .completedAt(transaction.getCompletedAt())
                .build();
    }
}
