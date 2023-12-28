import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeditemComponent } from './feeditem.component';

describe('FeeditemComponent', () => {
  let component: FeeditemComponent;
  let fixture: ComponentFixture<FeeditemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeditemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeeditemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
