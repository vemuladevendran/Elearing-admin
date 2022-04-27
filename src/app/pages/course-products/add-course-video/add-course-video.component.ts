import { Location } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { VideoService } from 'src/app/services/video/video.service';

@Component({
  selector: 'app-add-course-video',
  templateUrl: './add-course-video.component.html',
  styleUrls: ['./add-course-video.component.scss']
})
export class AddCourseVideoComponent implements OnInit, OnChanges {
  addVideoForm: FormGroup;
  courseName = '';
  courseId = '';
  formValues: any
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private videoServe: VideoService
  ) {
    this.addVideoForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      videoDuration: ['', [Validators.required]],
      priority: ['', [Validators.required]],
    })
    this.courseId = this.route.snapshot.paramMap.get('id') ?? '';
    this.courseName = this.route.snapshot.paramMap.get('course') ?? '';
  }

  handleFormValues(): void {
    const data = this.addVideoForm.value;
    data.course = this.courseId;
    this.formValues = data;
    this.videoServe.videoFormDetails = data;
  }

  goBack(): void {
    this.location.back();
  }

  ngOnChanges(): void {
    const data = this.addVideoForm.value;
    data.course = this.courseId;
    this.formValues = data;
    this.videoServe.videoFormDetails = data;
  }

  ngOnInit(): void {
  }

}
