import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthVerifyEmailComponent } from './auth-verify-email.component';

describe('VerifyMailComponent', () => {
  let component: AuthVerifyEmailComponent;
  let fixture: ComponentFixture<AuthVerifyEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthVerifyEmailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthVerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
