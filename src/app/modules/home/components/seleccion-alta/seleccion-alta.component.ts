import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleccion-alta',
  templateUrl: './seleccion-alta.component.html',
  styleUrls: ['./seleccion-alta.component.scss']
})
export class SeleccionAltaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routerNoChange(path: string){
    this.router.navigateByUrl(path, { skipLocationChange: true });
  }



}
