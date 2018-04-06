import { AlertController } from 'ionic-angular';
import { IExpense } from './../../app/expense.model';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ExpenseService } from './../../app/expense.service';


@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  categories: string[];
  expense: IExpense;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private expenseService: ExpenseService,
    private alertCtrl: AlertController) {
    this.categories = expenseService.categories;
    const expenseId = navParams.get('expenseId');
    this.expense = {
      date: '',
      amount: 0,
      category: '',
      description: ''
    };

    if (expenseId) {
      expenseService.getExpense(expenseId)
        .then(expense => this.expense = expense);
    }
  }

  onSave() {
    if (this.expense.id) {
      this.expenseService.updateExpense(this.expense);
    } else {
      this.expenseService.addExpense(this.expense);
    }
    this.navCtrl.pop();
  }

  onTrash() {
    let confirm = this.alertCtrl.create({
      title: 'Delete Expense?',
      message: `Are you sure you want to detete this expense: "${this.expense.description}"?`,
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Confirm',
          handler: () => {
            this.expenseService.removeExpense(this.expense.id);
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }
}
