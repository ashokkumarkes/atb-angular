https://html.phoenixcoded.net/mega-able/default/index.html

https://www.youtube.com/watch?v=NiwJHNx3etY

https://www.youtube.com/watch?v=CnnVSerJh8I&list=PLZeQR2FcsS5TP95tP4AqUXSiGiNQZHckM



CREATE TABLE wallets (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  available_balance DECIMAL(12,2) DEFAULT 0.00,   -- Free to use balance
  locked_balance DECIMAL(12,2) DEFAULT 0.00,      -- In escrow / held during trades
  total_earned DECIMAL(12,2) DEFAULT 0.00,        -- Total credits earned till now
  total_spent DECIMAL(12,2) DEFAULT 0.00,         -- Total spent (commissions, penalties)
  currency VARCHAR(10) DEFAULT 'CREDITS',         -- Optional: CREDITS or INR
  status ENUM('active', 'suspended') DEFAULT 'active',
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE wallet_transactions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  wallet_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  transaction_type ENUM(
    'credit',       -- Seller earned credits
    'debit',        -- Seller spent credits
    'lock',         -- Credits held for trade
    'release',      -- Locked credits released
    'penalty',      -- Deduction due to dispute
    'commission',   -- Platform commission
    'topup',        -- Admin/manual top-up
    'withdrawal'    -- Seller withdraw credits
  ) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  reference_id BIGINT NULL,         -- Trade ID / Order ID / Dispute ID
  description VARCHAR(255) NULL,    -- Short description
  balance_after DECIMAL(12,2) NULL, -- Snapshot after transaction
  status ENUM('success','pending','failed') DEFAULT 'success',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (wallet_id) REFERENCES wallets(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE wallet_locks (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  trade_id BIGINT NOT NULL,
  locked_amount DECIMAL(12,2) NOT NULL,
  reason ENUM('barter_trade', 'dispute', 'penalty_hold') DEFAULT 'barter_trade',
  status ENUM('locked', 'released', 'forfeited') DEFAULT 'locked',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  released_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
  


