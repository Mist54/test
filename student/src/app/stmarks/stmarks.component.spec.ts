import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StmarksComponent } from './stmarks.component';

describe('StmarksComponent', () => {
  let component: StmarksComponent;
  let fixture: ComponentFixture<StmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StmarksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
