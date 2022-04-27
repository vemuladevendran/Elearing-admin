import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoFormPreviewComponent } from './video-form-preview.component';

describe('VideoFormPreviewComponent', () => {
  let component: VideoFormPreviewComponent;
  let fixture: ComponentFixture<VideoFormPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoFormPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoFormPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
