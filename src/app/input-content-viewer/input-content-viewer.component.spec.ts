import { TestBed } from '@angular/core/testing';
import { InputContentViewerComponent } from './input-content-viewer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Line } from '../types/line.type';
import { Reasons } from '../interfaces/reasons.interface';
import { Balance } from '../interfaces/balance.interface';

const MOCKED_OK_DATA: Line[] = [
    {"id": 1, "date": "2023-01-23 10:00:00", "label": "First movement", "amount": 10},
    {"id": 2, "date": "2023-01-23 10:05:00", "label": "Second movement", "amount": 20},
    {"id": 3, "date": "2023-01-23 10:10:00", "label": "Third movement", "amount": 30},
    {"date": "2023-01-24 00:00:00", "balance": 60},
    {"id": 4, "date": "2023-01-24 10:00:00", "label": "Fourth movement", "amount": 10},
    {"id": 5, "date": "2023-01-25 10:10:00", "label": "Fifth movement", "amount": 30},
    {"id": 6, "date": "2023-01-25 10:05:00", "label": "Sixth movement", "amount": 20},
    {"date": "2023-01-26 00:00:00", "balance": 60}
];

const MOCKED_KO_DATA: Line[] = [
    {"id": 1, "date": "2023-01-23 10:00:00", "label": "First movement", "amount": 10},
    {"id": 2, "date": "2023-01-23 10:05:00", "label": "Second movement", "amount": 20},
    {"id": 3, "date": "2023-01-23 10:10:00", "label": "Third movement", "amount": 50},
    {"date": "2023-01-24 00:00:00", "balance": 60},
    {"id": 4, "date": "2023-01-24 10:00:00", "label": "Fourth movement", "amount": 10},
    {"id": 5, "date": "2023-01-25 10:10:00", "label": "Fifth movement", "amount": 30},
    {"id": 5, "date": "2023-01-25 10:10:00", "label": "Fifth movement", "amount": 30},
    {"id": 6, "date": "2023-01-25 10:05:00", "label": "Sixth movement", "amount": 20},
    {"date": "2023-01-26 00:00:00", "balance": 60},
    {"date": "2023-01-26 00:00:00", "balance": 60},
    {"id": 7, "date": "2023-01-27 10:25:00", "label": "Seventh movement", "amount": 20},
    {"date": "2023-01-28 00:00:00", "balance": 20},
];

const BALANCE_ERROR_0 = {
    start: null as unknown as Balance,
    end: {date: "2023-01-24 00:00:00", balance: 60},
    diff: {expected: 60, computed: 80, delta: -20},
    movements: [
        {id: 1, date: "2023-01-23 10:00:00", label: "First movement", amount: 10},
        {id: 2, date: "2023-01-23 10:05:00", label: "Second movement", amount: 20},
        {id: 3, date: "2023-01-23 10:10:00", label: "Third movement", amount: 50}
    ]
};

const BALANCE_ERROR_1 = {
    start: {date: "2023-01-24 00:00:00", balance: 60},
    end: {date: "2023-01-26 00:00:00", balance: 60},
    diff: {expected: 60, computed: 90, delta: -30},
    movements: [
        {id: 4, date: "2023-01-24 10:00:00", label: "Fourth movement", amount: 10},
        {id: 6, date: "2023-01-25 10:05:00", label: "Sixth movement", amount: 20},
        {id: 5, date: "2023-01-25 10:10:00", label: "Fifth movement", amount: 30},
        {id: 5, date: "2023-01-25 10:10:00", label: "Fifth movement", amount: 30}
    ]
};

const BALANCE_ERROR_2 = {
    start: {date: "2023-01-26 00:00:00", balance: 60},
    end: {date: "2023-01-26 00:00:00", balance: 60},
    diff: {expected: 60, computed: 0, delta: 60},
    movements: []
}

const MOCKED_REASONS: Reasons = {
    balances: [
        BALANCE_ERROR_0,
        BALANCE_ERROR_1,
        BALANCE_ERROR_2,
    ],
    duplicates: {
        movements: [
            {id: 5, date: "2023-01-25 10:10:00", label: "Fifth movement", amount: 30}
        ],
        balances: [
            {date: "2023-01-26 00:00:00", balance: 60}
        ]
    }
};

describe('InputContentViewerComponent', () => {
    let component: InputContentViewerComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InputContentViewerComponent, HttpClientTestingModule],
        }).compileComponents();

        const fixture = TestBed.createComponent(InputContentViewerComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    describe('hasErrors', () => {

        it('should false if no reasons', () => {
            component.reasons = {} as unknown as Reasons
            expect(component.hasErrors()).toBe(false);
        });

        it('should true if reasons', () => {
            component.reasons = MOCKED_REASONS
            expect(component.hasErrors()).toBe(true);
        });

    });

    describe('isDuplicate', () => {

        beforeEach(() => {
            component.reasons = MOCKED_REASONS
        });

        it('should return false if balance is not a duplicate', () => {
            expect(component.isDuplicate({date: "2023-01-27 00:00:00", balance: 80}, 'balances')).toBe(false)
        });

        it('should return false if movement is not a duplicate', () => {
            expect(component.isDuplicate({id: 12, date: "2023-01-25 10:20:00", label: "Tagada movement", amount: 40}, 'movements')).toBe(false)
        });

        it('should return true if balance is a duplicate', () => {
            expect(component.isDuplicate({date: "2023-01-26 00:00:00", balance: 60}, 'balances')).toBe(true)
        });

        it('should return true if movement is a duplicate', () => {
            expect(component.isDuplicate({id: 5, date: "2023-01-25 10:10:00", label: "Fifth movement", amount: 30}, 'movements')).toBe(true)
        });

    });

    describe('deleteLineAtIndex', () => {

        it('should delete correct line from data', () => {
            component.data = MOCKED_OK_DATA
            component.deleteLineAtIndex(1);
            expect(component.data).toEqual([
                {"id": 1, "date": "2023-01-23 10:00:00", "label": "First movement", "amount": 10},
                {"id": 3, "date": "2023-01-23 10:10:00", "label": "Third movement", "amount": 30},
                {"date": "2023-01-24 00:00:00", "balance": 60},
                {"id": 4, "date": "2023-01-24 10:00:00", "label": "Fourth movement", "amount": 10},
                {"id": 5, "date": "2023-01-25 10:10:00", "label": "Fifth movement", "amount": 30},
                {"id": 6, "date": "2023-01-25 10:05:00", "label": "Sixth movement", "amount": 20},
                {"date": "2023-01-26 00:00:00", "balance": 60}
            ])
        });

    });

    describe('isBalanceWrong', () => {

        beforeEach(() => {
            component.reasons = MOCKED_REASONS
        });

        it('should return false if balance is OK', () => {
            expect(component.isBalanceWrong({"date": "2023-01-27 00:00:00", "balance": 100})).toBe(false)
        });

        it('should return true if balance is wrong', () => {
            expect(component.isBalanceWrong({"date": "2023-01-24 00:00:00", "balance": 60})).toBe(true)
        });

    });

    describe('getBalanceErrorFromLineIndex', () => {

        beforeEach(() => {
            component.data = MOCKED_KO_DATA
            component.reasons = MOCKED_REASONS
        });

        it('should return correct balance error if balance is found', () => {
            expect(component.getBalanceErrorFromLineIndex(3)).toEqual(BALANCE_ERROR_0)
        });

        it('should return undefined if balance is not found in reasons', () => {
            expect(component.getBalanceErrorFromLineIndex(11)).toEqual(undefined)
        });

    });

    describe('getCorrectBalance', () => {

        beforeEach(() => {
            component.data = MOCKED_KO_DATA
            component.reasons = MOCKED_REASONS
        });

        it('should return correct balance if balance is found', () => {
            expect(component.getCorrectBalance(3)).toEqual(80)
        });

        it('should return current balance if balance is not found in reasons', () => {
            expect(component.getCorrectBalance(11)).toEqual(20)
        });
        
    });

    describe('correctBalanceAtIndex', () => {

        beforeEach(() => {
            component.data = MOCKED_KO_DATA
            component.reasons = MOCKED_REASONS
        });

        it('should update component data with correct balance if balance is found', () => {
            component.correctBalanceAtIndex(3)
            expect(component.data).toEqual([
                {"id": 1, "date": "2023-01-23 10:00:00", "label": "First movement", "amount": 10},
                {"id": 2, "date": "2023-01-23 10:05:00", "label": "Second movement", "amount": 20},
                {"id": 3, "date": "2023-01-23 10:10:00", "label": "Third movement", "amount": 50},
                {"date": "2023-01-24 00:00:00", "balance": 80},
                {"id": 4, "date": "2023-01-24 10:00:00", "label": "Fourth movement", "amount": 10},
                {"id": 5, "date": "2023-01-25 10:10:00", "label": "Fifth movement", "amount": 30},
                {"id": 5, "date": "2023-01-25 10:10:00", "label": "Fifth movement", "amount": 30},
                {"id": 6, "date": "2023-01-25 10:05:00", "label": "Sixth movement", "amount": 20},
                {"date": "2023-01-26 00:00:00", "balance": 60},
                {"date": "2023-01-26 00:00:00", "balance": 60},
                {"id": 7, "date": "2023-01-27 10:25:00", "label": "Seventh movement", "amount": 20},
                {"date": "2023-01-28 00:00:00", "balance": 20},
            ])
        });

        it('should not update component data if balance is not found in reasons', () => {
            component.correctBalanceAtIndex(11)
            expect(component.data).toEqual(MOCKED_KO_DATA)
        });

    });

    describe('transformDataToValidationData', () => {

        it('should transform data correctly', () => {
            component.data = MOCKED_OK_DATA;
            expect(component.transformDataToValidationData()).toEqual({
                movements: [
                    {"id": 1, "date": "2023-01-23 10:00:00", "label": "First movement", "amount": 10},
                    {"id": 2, "date": "2023-01-23 10:05:00", "label": "Second movement", "amount": 20},
                    {"id": 3, "date": "2023-01-23 10:10:00", "label": "Third movement", "amount": 30},
                    {"id": 4, "date": "2023-01-24 10:00:00", "label": "Fourth movement", "amount": 10},
                    {"id": 5, "date": "2023-01-25 10:10:00", "label": "Fifth movement", "amount": 30},
                    {"id": 6, "date": "2023-01-25 10:05:00", "label": "Sixth movement", "amount": 20}
                ],
                balances: [
                    {"date": "2023-01-24 00:00:00", "balance": 60},
                    {"date": "2023-01-26 00:00:00", "balance": 60}
                ]
            });
        });

    });

});
