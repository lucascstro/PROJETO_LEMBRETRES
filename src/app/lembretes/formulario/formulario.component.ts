import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {LembretesService} from '../lembrete.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Lembretes } from '../lembrete.model';
import {formatDate} from '@angular/common';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { AlertService } from 'src/app/alert.service';
 @Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit  {

  constructor(
    public lembreteService:LembretesService,
    public route: ActivatedRoute,
    public alertService:AlertService) { }

  private modo: string = "criar";
  private idLembrete:string;
  public lembrete:Lembretes;
  ngOnInit(){
    this.route.paramMap.subscribe((paramMap:ParamMap) =>{
      if(paramMap.has("idLembrete")){
        this.modo="editar";
        this.idLembrete = paramMap.get("idLembrete");
        this.lembrete = this.lembreteService.getLembrete(this.idLembrete);
      }
        else{
        this.modo = "criar";
        this.idLembrete = null;
      }
    })
  }
  onSalvarLembrete(form: NgForm){
    if(form.invalid){
      return;
    }
    if(this.modo === "criar"){
      var data = new Date();
    this.lembreteService.adicionarLembretes(
      form.value.titulo,
      form.value.date,
      form.value.descricao,
      data.toISOString().toString()
    );
    this.alertService.sucesse("O lembrete foi inserido","Sucesso");
    }
    else{
      var data = new Date();
      this.lembreteService.atualizarLembrete(
        this.idLembrete,
        form.value.titulo,
        form.value.date,
        form.value.descricao,
        data.toISOString().toString()
      );
      this.alertService.sucesse("O lembrete foi atualizado","Sucesso");
    }

  form.resetForm();
  }

}
