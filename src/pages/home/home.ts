import { ExpenseService } from './../../app/expense.service';
import { DetailPage } from './../detail/detail';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import  { IExpense }  from './../../app/expense.model'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  expenses: Array<IExpense>;

  constructor(
    private navCtrl: NavController,
    private expenseService: ExpenseService) {  }

  ionViewWillEnter() {
    this.expenseService.getExpenses()
    .then(expenses => this.expenses = expenses);
  }

  OnItemClick(expense: IExpense) {
    console.log(expense);
    this.navCtrl.push(DetailPage, {
      expenseId: expense.id
    });
  }

  onAddClicked() {
    this.navCtrl.push(DetailPage);
  }
}
