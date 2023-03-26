import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentcredComponent } from './studentcred.component';

describe('StudentcredComponent', () => {
  let component: StudentcredComponent;
  let fixture: ComponentFixture<StudentcredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentcredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentcredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
