import { Movement } from '../interfaces/movement.interface';
import { Balance } from '../interfaces/balance.interface';

export interface ValidationData {
    movements: Movement[];
    balances: Balance[];
}
