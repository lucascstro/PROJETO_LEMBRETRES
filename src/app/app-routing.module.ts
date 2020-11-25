import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './lembretes/login/login.component'
import {MostraLembretesComponent} from './lembretes/mostra-lembretes/mostra-lembretes.component';
import {FormularioComponent} from './lembretes/formulario/formulario.component';
const routes: Routes = [
  //{path:'login', component:LoginComponent},
  {path:'',component: MostraLembretesComponent},
  {path:'criar', component: FormularioComponent},
  {path:'editar/:idLembrete', component: FormularioComponent}

];
@NgModule({
  imports:[
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule{
}
