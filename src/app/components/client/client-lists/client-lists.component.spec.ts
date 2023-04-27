import { ComponentFixture, TestBed } from '@angular/core/testing';

import ClientListsComponent from './client-lists.component';

describe('RegistrationListComponent', () => {
  let component: ClientListsComponent;
  let fixture: ComponentFixture<ClientListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientListsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
