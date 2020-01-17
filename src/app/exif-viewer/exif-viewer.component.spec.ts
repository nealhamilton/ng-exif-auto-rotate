import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExifViewerComponent } from './exif-viewer.component';

describe('ExifViewerComponent', () => {
  let component: ExifViewerComponent;
  let fixture: ComponentFixture<ExifViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExifViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExifViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
