import { Injectable } from '@angular/core';
import Swal,{SweetAlertIcon} from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class AlertService {

public sucesse(mensagem:string, title:string):void
{
  this.showAlert(title, mensagem, 'success');
}
public info(mensagem:string, title:string):void
{
  this.showAlert(title, mensagem, 'info');
}
public error(mensagem:string, title:string):void
{
  this.showAlert(title, mensagem, 'error');
}

  constructor() { }
  private showAlert(
    title : string,
    mensagem : string,
    icon: SweetAlertIcon
    ):void{
      Swal.fire(title,mensagem,icon)
    }
}
