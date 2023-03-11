import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabGroupsComponent } from './lab-groups.component';

describe('LabGroupsComponent', () => {
  let component: LabGroupsComponent;
  let fixture: ComponentFixture<LabGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
