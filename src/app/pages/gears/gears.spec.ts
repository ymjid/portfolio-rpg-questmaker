import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gears } from './gears';

describe('Gears', () => {
  let component: Gears;
  let fixture: ComponentFixture<Gears>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gears]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gears);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
