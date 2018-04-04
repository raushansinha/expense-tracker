import { v4 as uuid } from 'uuid';
import { IExpense } from './expense.model';
import { JsonPipe } from '@angular/common';


export class ExpenseService {
    categories = [
        'Food',
        'Travel',
        'Other'
    ];

    //static nextId = 4;

    // expenses: Array<IExpense> = [
    //     {
    //         id: 1,
    //         date: '2018-03-17',
    //         amount: 7.25,
    //         category: 'Food',
    //         description: 'Lunch'
    //     },
    //     {
    //         id: 2,
    //         date: '2018-03-13',
    //         amount: 6.00,
    //         category: 'Travel',
    //         description: 'Train Ticket'
    //     },
    //     {
    //         id: 3,
    //         date: '2018-01-11',
    //         amount: 13.99,
    //         category: 'Food',
    //         description: 'Dinner'
    //     }
    // ];
    
    //expenses: Array<IExpense> = [];

    expenses = this.loadExpenses();

   private loadExpenses(): Array<IExpense> {
        const expenses = localStorage.getItem('expenses');
        if(expenses) {
            return JSON.parse(expenses);
        } else {
            return [];
        }
    }

    private storeExpenses() {
        localStorage.setItem('expences', JSON.stringify(this.expenses));
    }

    public addExpense(expense: IExpense) {
        expense.id = uuid();
        this.expenses.push(expense);
        this.storeExpenses()
    }

    public getExpense(expenseId: string): IExpense {
        const expense =  this.expenses.find(it => it.id === expenseId);
        return Object.assign({}, expense); // assign does only shallow copy means, copies only main object prperties and not child object properties as in deep copy 
    }

    public updateExpense(expense: IExpense) {
        const index =  this.expenses.findIndex(it => it.id === expense.id);
        this.expenses[index] = expense;
        this.storeExpenses();
    }

    public removeExpense(expenseId: string) {
        const index =  this.expenses.findIndex(it => it.id === expenseId);
        this.expenses.splice(index, 1);
        this.storeExpenses();
    }
}