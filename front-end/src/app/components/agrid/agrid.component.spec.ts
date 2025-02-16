import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgridComponent } from './agrid.component';

describe('AgridComponent', () => {
  let component: AgridComponent;
  let fixture: ComponentFixture<AgridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
