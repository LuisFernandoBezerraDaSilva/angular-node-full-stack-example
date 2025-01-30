import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasePageComponent } from './base-page.component';
import { Subscription } from 'rxjs';
import { Component } from '@angular/core'; // Importar de @angular/core

// Subclasse de teste para expor o método protegido
@Component({
  selector: 'app-test-base-page',
  standalone: true,
  template: ''
})
class TestBasePageComponent extends BasePageComponent {
  public addTestSubscription(subscription: Subscription) {
    this.addSubscription(subscription);
  }
}

describe('BasePageComponent', () => {
  let component: TestBasePageComponent;
  let fixture: ComponentFixture<TestBasePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestBasePageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestBasePageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add subscriptions', () => {
    const subscription = new Subscription();
    component.addTestSubscription(subscription);
    expect(component['subscriptions'].length).toBe(1);
  });

  it('should unsubscribe from all subscriptions on destroy', () => {
    const subscription1 = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    const subscription2 = jasmine.createSpyObj('Subscription', ['unsubscribe']);

    component['subscriptions'] = [subscription1, subscription2];
    component.ngOnDestroy();

    expect(subscription1.unsubscribe).toHaveBeenCalled();
    expect(subscription2.unsubscribe).toHaveBeenCalled();
  });
});