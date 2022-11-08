import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit {

  @Output()
    captchaEmitido: EventEmitter<boolean> = new EventEmitter<boolean>()

    public valorRange: number = 0;
    public valueMin: number = 0;
    public valueMax: number = 100;

  constructor() { }

  ngOnInit(): void {
    this.valueMin = Math.floor(Math.random() * (90 - 10 + 1) + 10);
    this.valueMax = Math.floor(Math.random() * (100 - this.valueMin + 1) + this.valueMin);
  }

  emitirCaptcha(){
    this.captchaEmitido.emit(this.valorRange >= this.valueMin && this.valorRange <= this.valueMax);
  }

}
