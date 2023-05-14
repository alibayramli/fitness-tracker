import { ComponentFixture, TestBed } from '@angular/core/testing';
import AccessNotFoundComponent from './access-not-found.component';

describe('AccessNotFoundComponent', () => {
  let component: AccessNotFoundComponent;
  let fixture: ComponentFixture<AccessNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessNotFoundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccessNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
