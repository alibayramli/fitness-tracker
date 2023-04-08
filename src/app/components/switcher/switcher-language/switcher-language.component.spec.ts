import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitcherLanguageComponent } from './switcher-language.component';

describe('LanguageSwitcherComponent', () => {
  let component: SwitcherLanguageComponent;
  let fixture: ComponentFixture<SwitcherLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitcherLanguageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitcherLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
