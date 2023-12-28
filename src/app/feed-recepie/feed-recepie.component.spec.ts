import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedRecepieComponent } from './feed-recepie.component';

describe('FeedRecepieComponent', () => {
  let component: FeedRecepieComponent;
  let fixture: ComponentFixture<FeedRecepieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedRecepieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedRecepieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
