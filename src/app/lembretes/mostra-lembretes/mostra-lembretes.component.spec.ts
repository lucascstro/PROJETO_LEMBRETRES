import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostraLembretesComponent } from './mostra-lembretes.component';

describe('MostraLembretesComponent', () => {
  let component: MostraLembretesComponent;
  let fixture: ComponentFixture<MostraLembretesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostraLembretesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostraLembretesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
