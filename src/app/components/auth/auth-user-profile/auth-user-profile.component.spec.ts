import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUserProfileComponent } from './auth-user-profile.component';

describe('UserProfileComponent', () => {
  let component: AuthUserProfileComponent;
  let fixture: ComponentFixture<AuthUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthUserProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
