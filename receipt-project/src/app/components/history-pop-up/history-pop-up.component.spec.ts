import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPopUpComponent } from './history-pop-up.component';

describe('HistoryPopUpComponent', () => {
  let component: HistoryPopUpComponent;
  let fixture: ComponentFixture<HistoryPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
