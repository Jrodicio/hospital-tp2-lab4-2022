import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../providers/auth.service';

@Component({
  selector: 'app-nav-sidebart',
  templateUrl: './nav-sidebart.component.html',
  styleUrls: ['./nav-sidebart.component.scss']
})
export class NavSidebartComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  checkRoute(ruta: string){
    if(this.router.url.includes(ruta))
    return 'active'
    else
    return ''
  }

  logout(){
    this.authService.signoutUser()
    .then(() => this.router.navigate(['']));
  }
}
