import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiClimaPage } from './api-clima.page';

describe('ApiClimaPage', () => {
  let component: ApiClimaPage;
  let fixture: ComponentFixture<ApiClimaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ApiClimaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
