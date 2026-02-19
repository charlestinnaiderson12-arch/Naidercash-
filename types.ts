
export enum CardType {
  VIRTUAL = 'VIRTUAL',
  PHYSICAL = 'PHYSICAL'
}

export enum TransactionStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  FAILED = 'FAILED'
}

export interface Transaction {
  id: string;
  type: 'TRANSFER' | 'CARD_PAYMENT' | 'DEPOSIT';
  amount: number;
  currency: string;
  description: string;
  date: string;
  status: TransactionStatus;
}

export interface CreditCard {
  id: string;
  number: string;
  expiry: string;
  cvv: string;
  type: CardType;
  holder: string;
  balance: number;
  brand: 'VISA' | 'MASTERCARD';
  color: string;
}

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
}
