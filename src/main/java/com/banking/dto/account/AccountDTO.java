package com.banking.dto.account;

import com.banking.entity.enums.AccountStatus;
import com.banking.entity.enums.AccountType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccountDTO {
    private Long id;
    private String accountNumber;
    private AccountType accountType;
    private BigDecimal balance;
    private BigDecimal minimumBalance;
    private AccountStatus status;
    private String currency;
    private BigDecimal interestRate;
    private String ifscCode;
    private String branchCode;
    private LocalDateTime createdAt;
    private LocalDateTime lastTransactionAt;
}
