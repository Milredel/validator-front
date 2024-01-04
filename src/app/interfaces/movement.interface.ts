export interface Movement {
    id: number;
    date: string;
    label: string;
    amount: number;
    isDuplicate?: boolean;
}