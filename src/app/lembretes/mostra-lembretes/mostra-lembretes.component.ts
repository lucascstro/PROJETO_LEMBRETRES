import { Component, OnDestroy, OnInit } from '@angular/core';
import {Lembretes} from '../lembrete.model';
import {LembretesService} from '../lembrete.service';
import {Subscription, Observable} from 'rxjs';


@Component({
  selector: 'app-mostra-lembretes',
  templateUrl: './mostra-lembretes.component.html',
  styleUrls: ['./mostra-lembretes.component.css']
})
export class MostraLembretesComponent implements OnInit,OnDestroy {
 lembretes: Lembretes[] = [];
 private lembretesSubscription: Subscription;

  constructor(public lembreteService: LembretesService) { }

  ngOnInit(): void {
    this.lembreteService.getLembretes();
    this.lembretesSubscription= this.lembreteService.getListaDeLembretesAtualizadaObservable()
    .subscribe((lembretes:Lembretes[])=>{
      this.lembretes = lembretes;
    });
  }
  ngOnDestroy(): void{
    this.lembretesSubscription.unsubscribe();
  }

  onDelete(id: string){
    this.lembreteService.removerLembrete(id);
  }

  

  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
}
