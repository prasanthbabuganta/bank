package com.banking.controller;

import com.banking.dto.ApiResponse;
import com.banking.dto.transaction.TransactionDTO;
import com.banking.dto.transaction.TransferRequest;
import com.banking.service.TransactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Transactions", description = "Transaction and fund transfer endpoints")
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping("/transfer")
    @Operation(summary = "Transfer funds", description = "Transfers funds between accounts")
    public ResponseEntity<ApiResponse<TransactionDTO>> transfer(@Valid @RequestBody TransferRequest request) {
        TransactionDTO transaction = transactionService.transfer(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Transfer completed successfully", transaction));
    }

    @GetMapping
    @Operation(summary = "Get transactions", description = "Retrieves transaction history for an account")
    public ResponseEntity<ApiResponse<Page<TransactionDTO>>> getTransactions(
            @RequestParam String accountNumber,
            Pageable pageable
    ) {
        Page<TransactionDTO> transactions = transactionService.getMyTransactions(accountNumber, pageable);
        return ResponseEntity.ok(ApiResponse.success(transactions));
    }
}
