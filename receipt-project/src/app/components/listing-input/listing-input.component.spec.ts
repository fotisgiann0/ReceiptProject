import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingInputComponent } from './listing-input.component';

describe('ListingInputComponent', () => {
  let component: ListingInputComponent;
  let fixture: ComponentFixture<ListingInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
