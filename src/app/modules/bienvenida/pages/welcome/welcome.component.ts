import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
  ) {

  }

  ngOnInit(): void {
  }
}
