import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterClientComponent } from './register-client.component';

describe('RegisterComponent', () => {
  let component: RegisterClientComponent;
  let fixture: ComponentFixture<RegisterClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RegisterClientComponent]
}).compileComponents();

    fixture = TestBed.createComponent(RegisterClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
