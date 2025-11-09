package com.banking.service;

import com.banking.dto.account.AccountDTO;
import com.banking.dto.account.CreateAccountRequest;
import com.banking.entity.Account;
import com.banking.entity.User;
import com.banking.entity.enums.AccountStatus;
import com.banking.exception.BadRequestException;
import com.banking.exception.ResourceNotFoundException;
import com.banking.repository.AccountRepository;
import com.banking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final SecureRandom secureRandom = new SecureRandom();

    @Transactional
    public AccountDTO createAccount(CreateAccountRequest request) {
        User currentUser = getCurrentUser();

        String accountNumber = generateAccountNumber();

        Account account = Account.builder()
                .accountNumber(accountNumber)
                .user(currentUser)
                .accountType(request.getAccountType())
                .balance(request.getInitialDeposit() != null ? request.getInitialDeposit() : BigDecimal.ZERO)
                .minimumBalance(BigDecimal.valueOf(1000))
                .status(AccountStatus.PENDING_APPROVAL)
                .currency("INR")
                .interestRate(BigDecimal.valueOf(4.0))
                .ifscCode("BANK0001234")
                .branchCode(request.getBranchCode() != null ? request.getBranchCode() : "BR001")
                .build();

        account = accountRepository.save(account);
        return mapToAccountDTO(account);
    }

    public List<AccountDTO> getMyAccounts() {
        User currentUser = getCurrentUser();
        return accountRepository.findByUser(currentUser).stream()
                .map(this::mapToAccountDTO)
                .collect(Collectors.toList());
    }

    public AccountDTO getAccountByNumber(String accountNumber) {
        Account account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found"));

        User currentUser = getCurrentUser();
        if (!account.getUser().getId().equals(currentUser.getId())) {
            throw new BadRequestException("Unauthorized access to account");
        }

        return mapToAccountDTO(account);
    }

    private String generateAccountNumber() {
        String accountNumber;
        do {
            long number = 1000000000L + (long) (secureRandom.nextDouble() * 9000000000L);
            accountNumber = String.valueOf(number);
        } while (accountRepository.existsByAccountNumber(accountNumber));
        return accountNumber;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private AccountDTO mapToAccountDTO(Account account) {
        return AccountDTO.builder()
                .id(account.getId())
                .accountNumber(account.getAccountNumber())
                .accountType(account.getAccountType())
                .balance(account.getBalance())
                .minimumBalance(account.getMinimumBalance())
                .status(account.getStatus())
                .currency(account.getCurrency())
                .interestRate(account.getInterestRate())
                .ifscCode(account.getIfscCode())
                .branchCode(account.getBranchCode())
                .createdAt(account.getCreatedAt())
                .lastTransactionAt(account.getLastTransactionAt())
                .build();
    }
}
