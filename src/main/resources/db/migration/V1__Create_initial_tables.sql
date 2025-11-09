-- Users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) UNIQUE,
    address TEXT,
    pan_number VARCHAR(20) UNIQUE,
    aadhar_number VARCHAR(20) UNIQUE,
    date_of_birth TIMESTAMP,
    role VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    kyc_verified BOOLEAN DEFAULT FALSE,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255),
    failed_login_attempts INTEGER DEFAULT 0,
    account_locked_until TIMESTAMP,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Accounts table
CREATE TABLE accounts (
    id BIGSERIAL PRIMARY KEY,
    account_number VARCHAR(50) UNIQUE NOT NULL,
    user_id BIGINT NOT NULL REFERENCES users(id),
    account_type VARCHAR(50) NOT NULL,
    balance DECIMAL(19, 2) NOT NULL DEFAULT 0.00,
    minimum_balance DECIMAL(19, 2),
    status VARCHAR(50) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    interest_rate DECIMAL(5, 2),
    ifsc_code VARCHAR(20),
    branch_code VARCHAR(20),
    last_transaction_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Transactions table
CREATE TABLE transactions (
    id BIGSERIAL PRIMARY KEY,
    transaction_reference VARCHAR(255) UNIQUE NOT NULL,
    from_account_id BIGINT REFERENCES accounts(id),
    to_account_id BIGINT REFERENCES accounts(id),
    type VARCHAR(50) NOT NULL,
    amount DECIMAL(19, 2) NOT NULL,
    fee DECIMAL(19, 2) DEFAULT 0.00,
    balance_after DECIMAL(19, 2),
    status VARCHAR(50) NOT NULL,
    description TEXT,
    external_reference VARCHAR(255),
    failure_reason TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Cards table
CREATE TABLE cards (
    id BIGSERIAL PRIMARY KEY,
    card_number VARCHAR(20) UNIQUE NOT NULL,
    account_id BIGINT NOT NULL REFERENCES accounts(id),
    card_type VARCHAR(50) NOT NULL,
    cardholder_name VARCHAR(200) NOT NULL,
    expiry_date DATE NOT NULL,
    cvv VARCHAR(10) NOT NULL,
    daily_limit DECIMAL(19, 2),
    monthly_limit DECIMAL(19, 2),
    status VARCHAR(50) NOT NULL,
    international_enabled BOOLEAN DEFAULT FALSE,
    contactless_enabled BOOLEAN DEFAULT TRUE,
    online_transaction_enabled BOOLEAN DEFAULT TRUE,
    pin VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Loans table
CREATE TABLE loans (
    id BIGSERIAL PRIMARY KEY,
    loan_number VARCHAR(50) UNIQUE NOT NULL,
    user_id BIGINT NOT NULL REFERENCES users(id),
    account_id BIGINT NOT NULL REFERENCES accounts(id),
    loan_type VARCHAR(50) NOT NULL,
    principal_amount DECIMAL(19, 2) NOT NULL,
    outstanding_amount DECIMAL(19, 2) NOT NULL,
    interest_rate DECIMAL(5, 2) NOT NULL,
    tenure_months INTEGER NOT NULL,
    emi_amount DECIMAL(19, 2),
    status VARCHAR(50) NOT NULL,
    disbursement_date DATE,
    first_emi_date DATE,
    last_emi_date DATE,
    paid_emis INTEGER DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Beneficiaries table
CREATE TABLE beneficiaries (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    name VARCHAR(200) NOT NULL,
    account_number VARCHAR(50) NOT NULL,
    ifsc_code VARCHAR(20) NOT NULL,
    bank_name VARCHAR(200),
    nickname VARCHAR(100),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_transaction_ref ON transactions(transaction_reference);
CREATE INDEX idx_from_account ON transactions(from_account_id);
CREATE INDEX idx_to_account ON transactions(to_account_id);
CREATE INDEX idx_created_at ON transactions(created_at);
CREATE INDEX idx_user_accounts ON accounts(user_id);
CREATE INDEX idx_user_loans ON loans(user_id);
CREATE INDEX idx_account_cards ON cards(account_id);
CREATE INDEX idx_user_beneficiaries ON beneficiaries(user_id);
