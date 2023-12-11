import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocentePagePage } from './docente-page.page';

describe('DocentePagePage', () => {
  let component: DocentePagePage;
  let fixture: ComponentFixture<DocentePagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DocentePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
