import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenModal } from './token-modal';

describe('TokenModal', () => {
  let component: TokenModal;
  let fixture: ComponentFixture<TokenModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
