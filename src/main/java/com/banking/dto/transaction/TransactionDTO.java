package com.banking.dto.transaction;

import com.banking.entity.enums.TransactionStatus;
import com.banking.entity.enums.TransactionType;
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
public class TransactionDTO {
    private Long id;
    private String transactionReference;
    private String fromAccountNumber;
    private String toAccountNumber;
    private TransactionType type;
    private BigDecimal amount;
    private BigDecimal fee;
    private BigDecimal balanceAfter;
    private TransactionStatus status;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;
}
