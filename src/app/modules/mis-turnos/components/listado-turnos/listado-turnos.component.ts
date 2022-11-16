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

  cargarInformeClinico(turno: any){
    turno.cargarInforme = true;
  }

  onInformeClinicoCargado(turnoOld: any, turnoNew: any){
    turnoOld = turnoNew;
    turnoOld.cargarInforme = false;
    this.finalizar(turnoOld);
  }

  finalizar(turno: any){
    swal("Ingrese un comentario sobre la revisión", {
      content: {'element':'input'},
      icon: 'info',
      title: 'Comentario'
    })
    .then((comentario) => {
      if(comentario){
        swal("¿Cuál es el diagnóstico del paciente?", {
          content: {'element':'input'},
          icon: 'info',
          title: 'Diagnóstico'
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

  valorarAtencion(turno: any){
    let slider = document.createElement("input");
    slider.type = "range";
    slider.value = '0';

    swal("¿Qué tan buena ha sido la atención recibida?", {
      content: {element: slider},
      icon: 'info',
      title: 'Valoración',
      buttons: ["Cancelar", "Aceptar"],
    })
    .then(() => {
      turno.valoracion = parseInt(slider.value);
      this.firestoreService.setDocument("turnos", turno.id, turno);
      if(turno.valoracion < 30){
        swal("¡Valoración registrada!","¡Lamentamos que su atención no haya sido la esperada, trabajaremos para solucionarlo!",'success');
      }
      else if(turno.valoracion < 70){
        swal("¡Valoración registrada!","¡Estamos trabajando para mejorar la atención de nuestros especialistas!",'success');
      }
      else{
        swal("¡Valoración registrada!","¡Gracias por elegirnos!",'success');
      }
    });
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
                turno.encuesta = encuesta;
                this.firestoreService.setDocument("turnos", turno.id, turno);
                swal("¡Encuesta completada!","¡Muchas gracias por completar la encuesta!",'success');
              }
            })
          }
        })
      }
    });
  }
}
