import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugUsagesComponent } from './drug-usages.component';

describe('DrugUsagesComponent', () => {
  let component: DrugUsagesComponent;
  let fixture: ComponentFixture<DrugUsagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugUsagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrugUsagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
