import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-add-course-video',
  templateUrl: './add-course-video.component.html',
  styleUrls: ['./add-course-video.component.scss']
})
export class AddCourseVideoComponent implements OnInit {
  addVideoForm: FormGroup;
  courseName = '';
  courseId = '';
  constructor(
    private fb: FormBuilder,
    private loader: LoaderService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.addVideoForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      videoDuration: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      // course: ['', [Validators.required]],
      // video: ['', [Validators.required]]
    })
    this.courseId = this.route.snapshot.paramMap.get('id') ?? '';
    this.courseName = this.route.snapshot.paramMap.get('course') ?? '';
  }

  submit(): void {
    const data = this.addVideoForm.value;
    data.course = this.courseId;
    console.log(data);
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
  }

}
