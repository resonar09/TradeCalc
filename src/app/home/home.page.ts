import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  private fundsPercentage: Number = 100;
  private numberOfTrades: Number = 1;
  private fundsAvaliable: Number;
  private fundsAvaliablePerTrade: Number;
  private stockEntry: Number;
  private stockExit: Number;
  private stockStop: Number;
  private stockLoss: Number;
  private stockProfit: Number;
  private percentageGainLossMin: Number = -4;
  private percentageGainLossMax: Number = 20;
  private percentageGainLoss: any = {
    upper: this.percentageGainLossMax,
    lower: this.percentageGainLossMin
  };
  private percentageLoss: Number;
  private percentageGain: Number;

  constructor() {
    this.percentageLoss = this.percentageGainLossMin;
    this.percentageGain = this.percentageGainLossMax;
  }
  onFundsChange() {
    if (this.fundsAvaliable > 0) {
      // tslint:disable-next-line:max-line-length
      this.fundsAvaliablePerTrade =
        (this.fundsAvaliable.valueOf() *
          (this.fundsPercentage.valueOf() / 100)) /
        this.numberOfTrades.valueOf();
    }
    this.onStockChange();
  }
  onPercentageGainLossChange() {

    this.percentageLoss = this.percentageGainLoss.lower;
    this.percentageGain = this.percentageGainLoss.upper;
    console.log('onPercentageGainLossChange ' + this.percentageGainLoss.lower + ' : ' + this.percentageGainLoss.upper );
    this.onStockChange();
  }
  onStockChange() {
    console.log('onStockChange ' + this.stockEntry + ':' + this.percentageLoss.valueOf() / 100);
    if (this.stockEntry > 0) {
        this.stockStop = this.stockEntry.valueOf() + (this.stockEntry.valueOf() * this.percentageLoss.valueOf() / 100);
        this.stockExit = this.stockEntry.valueOf() + (this.stockEntry.valueOf() * this.percentageGain.valueOf() / 100);
        if (this.fundsAvaliablePerTrade > 0) {
          // tslint:disable-next-line:max-line-length
          this.stockLoss = this.getCurrency((this.stockEntry.valueOf() * this.percentageLoss.valueOf() / 100) * this.fundsAvaliablePerTrade.valueOf());
          // tslint:disable-next-line:max-line-length
          this.stockProfit = this.getCurrency((this.stockEntry.valueOf() * this.percentageGain.valueOf() / 100) * this.fundsAvaliablePerTrade.valueOf());
        }
    }
  }
  getCurrency(amount: number) {
    //return this.currencyPipe.transform(amount, 'USD', true, '1.2-2');
    return amount;
  }
}
