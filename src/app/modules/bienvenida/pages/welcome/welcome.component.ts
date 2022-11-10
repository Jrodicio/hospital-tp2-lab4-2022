import { Component, OnInit, AfterContentInit } from '@angular/core';
import { AuthService } from '../../../../providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, AfterContentInit {

  public cargando: boolean = true;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    this.cargando = false;
  }

}
