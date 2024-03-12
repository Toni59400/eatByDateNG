import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutFormComponent } from './ajout-form.component';

describe('AjoutFormComponent', () => {
  let component: AjoutFormComponent;
  let fixture: ComponentFixture<AjoutFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutFormComponent]
    });
    fixture = TestBed.createComponent(AjoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
