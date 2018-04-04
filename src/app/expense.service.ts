import  Dexie  from 'dexie';
import { v4 as uuid } from 'uuid';
import { IExpense } from './expense.model';

export class ExpenseService extends Dexie{
    categories = [
        'Food',
        'Travel',
        'Other'
    ];

    // Declare implicit table properties.
    // (just to inform Typescript. Instanciated by Dexie in stores() method)
    expenses: Dexie.Table<IExpense, string>; // number = type of the primkey
    //...other tables goes here...

    constructor () {
        super("expense_tracker");
        this.version(1).stores({
            expenses: 'id, date'
        });
    }

    public addExpense(expense: IExpense) {
        expense.id = uuid();
        this.expenses.add(expense);
    }

    public getExpense(expenseId: string): Dexie.Promise<IExpense> {
        return this.expenses.get(expenseId);
    }

    public getExpenses(): Dexie.Promise<Array<IExpense>> {
        return this.expenses.toArray();
    }

    public updateExpense(expense: IExpense) {
        this.expenses.update(expense.id, expense);
    }

    public removeExpense(expenseId: string) {
        this.expenses.delete(expenseId);
    }
}