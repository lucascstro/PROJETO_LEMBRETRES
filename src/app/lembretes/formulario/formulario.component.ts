import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {LembretesService} from '../lembrete.service';
 @Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit  {

  constructor( public lembreteService:LembretesService) { }
  ngOnInit(): void {
  }
  onAdicionarLembrete(form: NgForm){
    if(form.invalid){
      return;
    }
    this.lembreteService.adicionarLembretes(
      form.value.titulo,
      form.value.date,
      form.value.descricao
    );
  form.resetForm();
  }

}
