import { BalanceError } from './balance-error.interface';
import { DuplicateError } from './duplicate-error.interface';

export interface Reasons {
    balances: BalanceError[];
    duplicates: DuplicateError;
}