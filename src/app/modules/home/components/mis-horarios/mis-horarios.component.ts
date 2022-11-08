import swal from 'sweetalert';
import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../../../../providers/firestore.service';

@Component({
  selector: 'app-mis-horarios',
  templateUrl: './mis-horarios.component.html',
  styleUrls: ['./mis-horarios.component.scss']
})
export class MisHorariosComponent implements OnInit {

  @Input()
    especialista: any;

  public loading: boolean = false;
  public cambiosSinguardar: boolean = false;
  public usuarioLogin: any;

  constructor(private firestoreService: FirestoreService) {

  }

  ngOnInit(): void {
    this.firestoreService.getDocument("users", this.especialista.uid)
    .then(user => {
      this.especialista = user.data();
      if(this.especialista.horario === undefined){
        this.especialista.horario = [
                                      {desc: 'Lunes',     day: 1, na: true, tm: false, tt: false},
                                      {desc: 'Martes',    day: 2, na: true, tm: false, tt: false},
                                      {desc: 'Miércoles', day: 3, na: true, tm: false, tt: false},
                                      {desc: 'Jueves',    day: 4, na: true, tm: false, tt: false},
                                      {desc: 'Viernes',   day: 5, na: true, tm: false, tt: false},
                                      {desc: 'Sábado',    day: 6, na: true, tm: false}
                                    ]
      }
    });
    this.usuarioLogin = JSON.parse(localStorage.getItem('user')!);
  }

  actualizarHorario(dia: number, na: boolean, tm: boolean, tt: boolean){
    this.cambiosSinguardar = true;
    this.especialista.horario[dia-1].na=na;
    this.especialista.horario[dia-1].tm=tm;
    this.especialista.horario[dia-1].tt=tt;
  }

  guardarCambios(){
    swal("Sus cambios están siendo procesados, por favor aguarde:", {
      icon: 'info',
      title: 'Guardando nuevo horario',
      buttons: [false],
      closeOnClickOutside: false,
      closeOnEsc: false
    });
    this.loading = true;

    this.firestoreService.setDocument('users',this.especialista.uid, this.especialista)
    .then(() => {
      this.loading = false;
      this.cambiosSinguardar = false;
      swal("¡Horario guardado!","¡Muchas gracias!",'success');
    })
  }
}
