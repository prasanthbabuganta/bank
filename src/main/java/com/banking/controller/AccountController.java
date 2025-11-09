package com.banking.controller;

import com.banking.dto.ApiResponse;
import com.banking.dto.account.AccountDTO;
import com.banking.dto.account.CreateAccountRequest;
import com.banking.service.AccountService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Accounts", description = "Account management endpoints")
public class AccountController {

    private final AccountService accountService;

    @PostMapping
    @Operation(summary = "Create new account", description = "Creates a new bank account for the authenticated user")
    public ResponseEntity<ApiResponse<AccountDTO>> createAccount(@Valid @RequestBody CreateAccountRequest request) {
        AccountDTO account = accountService.createAccount(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Account created successfully", account));
    }

    @GetMapping
    @Operation(summary = "Get all accounts", description = "Retrieves all accounts for the authenticated user")
    public ResponseEntity<ApiResponse<List<AccountDTO>>> getMyAccounts() {
        List<AccountDTO> accounts = accountService.getMyAccounts();
        return ResponseEntity.ok(ApiResponse.success(accounts));
    }

    @GetMapping("/{accountNumber}")
    @Operation(summary = "Get account by number", description = "Retrieves account details by account number")
    public ResponseEntity<ApiResponse<AccountDTO>> getAccountByNumber(@PathVariable String accountNumber) {
        AccountDTO account = accountService.getAccountByNumber(accountNumber);
        return ResponseEntity.ok(ApiResponse.success(account));
    }
}
