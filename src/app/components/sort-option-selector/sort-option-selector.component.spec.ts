import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortOptionSelectorComponent } from './sort-option-selector.component';

describe('SortOptionSelectorComponent', () => {
  let component: SortOptionSelectorComponent;
  let fixture: ComponentFixture<SortOptionSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortOptionSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortOptionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
