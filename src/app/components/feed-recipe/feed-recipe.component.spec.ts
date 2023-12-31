import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedRecipeComponent } from './feed-recipe.component';

describe('FeedRecipeComponent', () => {
  let component: FeedRecipeComponent;
  let fixture: ComponentFixture<FeedRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedRecipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
