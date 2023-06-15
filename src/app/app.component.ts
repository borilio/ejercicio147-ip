import { Component } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {DireccionIp} from "./models/direccionip.model";
import {Localizacion} from "./models/localizacion.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public direccionIP!: DireccionIp;
  public textoBoton: string;
  public cargando: boolean;
  public datosLocalizacion!: Localizacion;



  // TODO 2. Inyectar el servicio httpClient

  constructor(private httpClient: HttpClient) {
    this.textoBoton = "Obtener IP";
    this.cargando = false;
  }


  public actualizarIP() {
    // TODO 3. Usar el servicio httpClient
    // TODO 4. Suscribirnos al observable que obtenemos de .get()
    this.textoBoton = "Cargando...";
    this.cargando = true;
    this.httpClient.get<DireccionIp>("https://api.ipify.org/?format=json").subscribe(
      {
        next: (datos : DireccionIp) => {
          console.log("Han llegado los datos", datos);
          this.direccionIP = datos;
          this.textoBoton = "Obtener IP";
          this.cargando = false;
        },
        error: (error) => {
          console.error("Se ha producido un error", error);
          this.cargando = false;
        }
      }
    );

  }

  public actualizarLocalizacion(){
    const url = `https://ipinfo.io/${this.direccionIP.ip}/geo`;
    this.httpClient.get<Localizacion>(url).subscribe(
      {
        next: (datos : Localizacion) => {
          console.log("Llegaron los datos", datos);
          this.datosLocalizacion = datos;
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        }
      }
    );
  }

}
