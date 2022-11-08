import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../../../../providers/firestore.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-listado-turnos',
  templateUrl: './listado-turnos.component.html',
  styleUrls: ['./listado-turnos.component.scss']
})
export class ListadoTurnosComponent implements OnInit {

  @Input()
    listadoTurnos: any[] = [];

    perfilUsuario: string = '';
  constructor(private firestoreService: FirestoreService) {
  }

  ngOnInit(): void {
    this.perfilUsuario = localStorage.getItem('userProfile')!;
  }


  cancelar(turno: any,){
    swal("¿Por qué vas a cancelar este turno?", {
      content: {'element':'input'},
      icon: 'error',
      title: 'Cancelar',
      buttons: [false, 'Confirmar']
    })
    .then((motivo) => {
      if(motivo){
        turno.estado = 'Cancelado';
        turno.motivo = motivo;
        this.firestoreService.setDocument("turnos", turno.id, turno);
      }
    });
  }

  rechazar(turno: any){
    swal("¿Por qué vas a rechazar este turno?", {
      content: {'element':'input'},
      icon: 'error',
      title: 'Rechazar',
      buttons: [false, 'Confirmar']
    })
    .then((motivo) => {
      if(motivo){
        turno.estado = 'Rechazado';
        turno.motivo = motivo;
        this.firestoreService.setDocument("turnos", turno.id, turno);
      }
    });
  }

  aceptar(turno: any){
    turno.estado = 'Aceptado';
    swal("Aceptado", "El turno ha sido aceptado", "success");
    this.firestoreService.setDocument("turnos", turno.id, turno);
  }

  finalizar(turno: any){
    swal("Comentario:", {
      content: {'element':'input'},
      icon: 'info',
      title: 'Finalizar'
    })
    .then((comentario) => {
      if(comentario){
        swal("Diagnóstico:", {
          content: {'element':'input'},
          icon: 'info',
          title: 'Finalizar'
        })
        .then((diagnostico) => {
          if(diagnostico){
            turno.estado = 'Realizado';
            turno.comentario = comentario;
            turno.diagnostico = diagnostico;
            this.firestoreService.setDocument("turnos", turno.id, turno);
          }
        })
      }
    });
  }

  verResena(turno: any){
    swal(turno.diagnostico, turno.comentario, "info");
  }

  completarEncuesta(turno: any){
    let encuesta: any = {};

    swal("¿Qué te pareció el sistema de turnos online?", {
      content: {'element':'input'},
      icon: 'info',
      title: 'Encuesta',
      buttons: ["Cancelar", "Siguiente"],
    })
    .then((respuesta) => {
      if(respuesta){
        encuesta.pregunta1 = respuesta;
        swal("¿Te gusta la web?:", {
          content: {'element':'input'},
          icon: 'info',
          title: 'Encuesta',
          buttons: ["Cancelar", "Siguiente"],
        })
        .then(respuesta => {
          if(respuesta){
            encuesta.pregunta2 = respuesta;
            swal("¿Qué aspectos a mejorar notas de la web?:", {
              content: {'element':'input'},
              icon: 'info',
              title: 'Encuesta',
              buttons: ["Cancelar", "Finalizar"],
            })
            .then(respuesta => {
              if(respuesta){
                encuesta.pregunta3 = respuesta;
                swal("¡Encuesta completada!","¡Muchas gracias por completar la encuesta!",'success');
              }
            })
          }
        })
      }
    });
  }
}
