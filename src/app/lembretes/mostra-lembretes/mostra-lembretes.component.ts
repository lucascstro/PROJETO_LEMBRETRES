import { Component, OnDestroy, OnInit } from '@angular/core';
import {Lembretes} from '../lembrete.model';
import {LembreteService} from '../lembrete.service';
import {Subscription, Observable} from 'rxjs';
@Component({
  selector: 'app-mostra-lembretes',
  templateUrl: './mostra-lembretes.component.html',
  styleUrls: ['./mostra-lembretes.component.css']
})
export class MostraLembretesComponent implements OnInit,OnDestroy {
 lembretes: Lembretes[] = [];

 private lembreteSubscription: Subscription;
  constructor(public lembretesService: LembreteService) { }

  ngOnInit(): void {
    this.lembretesService.getLembretes();
    this.lembreteSubscription= this.lembretesService.getListaDeLembretesAtualizadaObservable()
    .subscribe((lembretes:Lembretes[])=>{
      this.lembretes = lembretes;
    });
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
  ngOnDestroy(): void{
    this.lembreteSubscription.unsubscribe();
  }
}
