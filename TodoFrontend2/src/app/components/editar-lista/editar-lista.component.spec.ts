import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarListaComponent } from './editar-lista.component';

describe('EditarListaComponent', () => {
  let component: EditarListaComponent;
  let fixture: ComponentFixture<EditarListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
