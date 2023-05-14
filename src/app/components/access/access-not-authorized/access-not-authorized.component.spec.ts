import { ComponentFixture, TestBed } from '@angular/core/testing';
import AccessNotAuthorizedComponent from './access-not-authorized.component';

describe('AccessNotAuthorizedComponent', () => {
  let component: AccessNotAuthorizedComponent;
  let fixture: ComponentFixture<AccessNotAuthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessNotAuthorizedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccessNotAuthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
