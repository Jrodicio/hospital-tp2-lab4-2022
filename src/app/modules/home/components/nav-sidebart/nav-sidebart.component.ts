import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../providers/auth.service';

@Component({
  selector: 'app-nav-sidebart',
  templateUrl: './nav-sidebart.component.html',
  styleUrls: ['./nav-sidebart.component.scss']
})
export class NavSidebartComponent implements OnInit {

  public perfilUser: string | null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.perfilUser = localStorage.getItem('userProfile');
  }

  ngOnInit(): void {
  }

  checkRoute(ruta: string): boolean{
    if(this.router.url == ruta)
    return true
    else
    return false
  }

  logout(){
    this.authService.signoutUser()
    .then(() => this.router.navigate(['']));
  }
}
