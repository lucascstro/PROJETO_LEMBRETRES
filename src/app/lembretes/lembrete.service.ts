import { Injectable } from '@angular/core';
import { Lembretes } from './lembrete.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { stringify } from 'querystring';

@Injectable({ providedIn: 'root' })
export class LembretesService{

  private lembretes: Lembretes [] = [];

  private listaLembretesAtualizada = new Subject <Lembretes[]>();

  constructor (private httpClient: HttpClient){
  }

  getLembrete(idLembrete: string){
    return{
      ...this.lembretes.find((lem) => lem.id === idLembrete)
    }

  }

  getLembretes(): void {
    this.httpClient.get <{mensagem: string, lembretes:any}>('http://localhost:3000/api/lembretes').pipe(map((dados) => {
    return dados.lembretes.map(lembrete => {
      return{
        id:lembrete._id,
        titulo:lembrete.titulo,
        data:lembrete.data,
        descricao:lembrete.descricao
      }
    })
      })).subscribe(
    (lembretes) => {
    this.lembretes = lembretes;
    this.listaLembretesAtualizada.next([...this.lembretes]);
    })}


  adicionarLembretes(titulo: string, data: string, descricao: string) {
    const lembretes: Lembretes = {
    id: null,
    titulo: titulo,
    data:data,
    descricao: descricao,
    };
    this.httpClient.post<{mensagem: string, id: string}> ('http://localhost:3000/api/lembretes',lembretes).subscribe(
    (dados) => {
    lembretes.id=dados.id;
    this.lembretes.push(lembretes);
    this.listaLembretesAtualizada.next([...this.lembretes]);
    })
  }
    getListaDeLembretesAtualizadaObservable(){
      return this.listaLembretesAtualizada.asObservable();
    }
/*
    getLembrete (idLembrete:string){
      //return{...this.lembretes.find((lem) => lem.id === idLembrete)};
      return this.httpClient.get<{_id: string, titulo: string, data: string,
        descricao:string}>('http://localhost:3000/api/lembretes/${idLembrete}');
    }*/

    atualizarLembrete (id:string, titulo:string, data:string, descricao:string){
      const lembrete : Lembretes = {
        id,
        titulo,
        data,
        descricao
          };
      this.httpClient.put(`http://localhost:3000/api/lembretes/${id}`, lembrete)
      .subscribe((res => console.log(res => {
        const copia = [...this.lembretes];
        const indice = copia.findIndex (lem => lem.id === lembrete.id);
        copia[indice]= lembrete;
        this.lembretes = copia;
        this.listaLembretesAtualizada.next([...this.lembretes]);
      })))
    }

    removerLembrete(id: string): void{
      this.httpClient.delete(`http://localhost:3000/api/lembretes/${id}`).subscribe(() => {
        this.lembretes = this.lembretes.filter((lem) => {
          return lem.id !== id
        });
        this.listaLembretesAtualizada.next([...this.lembretes]);
  });
  }
}

