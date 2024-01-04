import { Balance } from './balance.interface';
import { Movement } from './movement.interface';

export interface DuplicateError {
    movements: Movement[];
    balances: Balance[];
}