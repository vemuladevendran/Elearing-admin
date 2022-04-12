import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-add-course-material',
  templateUrl: './add-course-material.component.html',
  styleUrls: ['./add-course-material.component.scss']
})
export class AddCourseMaterialComponent implements OnInit {
  addMaterialForm: FormGroup;
  courseName = '';
  courseId = '';
  categoryList = ['sddd', 'dbh', 'dhbcihs', 'hfiedhj']
  constructor(
    private fb: FormBuilder,
    private loader: LoaderService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.addMaterialForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      // course: ['', [Validators.required]],
      // file: ['', [Validators.required]]
    })
    this.courseId = this.route.snapshot.paramMap.get('id') ?? '';
    this.courseName = this.route.snapshot.paramMap.get('course') ?? '';
  }

  submit(): void {
    const data = this.addMaterialForm.value;
    data.course = this.courseId;
    console.log(data);
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
  }

}
