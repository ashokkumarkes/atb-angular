import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HsnCodeListComponent } from './hsn-code-list.component';

describe('HsnCodeListComponent', () => {
  let component: HsnCodeListComponent;
  let fixture: ComponentFixture<HsnCodeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HsnCodeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HsnCodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
