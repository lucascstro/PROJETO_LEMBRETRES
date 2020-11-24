import { Injectable } from '@angular/core';
import { Lembretes } from './lembrete.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class LembreteService{

  private lembretes: Lembretes [] = [];

  private listaLembretesAtualizada = new Subject <Lembretes[]>();

  constructor (private httpClient: HttpClient){
  }

  getLembretes(): void {
    this.httpClient.get <{mensagem: string, lembretes:
      Lembretes[]}>('http://localhost:3000/api/lembretes').subscribe(
    (dados) => {
    this.lembretes = dados.lembretes;
    this.listaLembretesAtualizada.next([...this.lembretes]);
    }
    )
    }
  adicionarLembretes(titulo: string, data: string, descricao: string) {
    const lembretes: Lembretes = {

    titulo: titulo,
    data:data,
    descricao: descricao,
    };
    this.httpClient.post<{mensagem: string}> ('http://localhost:3000/api/lembretes',lembretes).subscribe(
    (dados) => {
    console.log(dados.mensagem);
    this.lembretes.push(lembretes);
    this.listaLembretesAtualizada.next([...this.lembretes]);
    }
    )
    }


    getListaDeLembretesAtualizadaObservable(){
      return this.listaLembretesAtualizada.asObservable();
    }
}

