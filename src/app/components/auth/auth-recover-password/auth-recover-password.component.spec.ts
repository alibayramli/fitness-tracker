import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRecoverPasswordComponent } from './auth-recover-password.component';

describe('RecoverPasswordComponent', () => {
  let component: AuthRecoverPasswordComponent;
  let fixture: ComponentFixture<AuthRecoverPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthRecoverPasswordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthRecoverPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
