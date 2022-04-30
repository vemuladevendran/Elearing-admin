import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { MaterialsService } from 'src/app/services/materials/materials.service';
import { VideoService } from 'src/app/services/video/video.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-course-material',
  templateUrl: './add-course-material.component.html',
  styleUrls: ['./add-course-material.component.scss']
})
export class AddCourseMaterialComponent implements OnInit {
  @ViewChild('materialFile') materialFileInput: ElementRef<HTMLInputElement> | undefined;
  selectedMaterialFile: any;
  addMaterialForm: FormGroup;
  courseName = '';
  courseId = '';
  fileUploadLoader = false;
  preSignedUrl: any;
  awsVideoUrl: any;


  constructor(
    private fb: FormBuilder,
    private loader: LoaderService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private location: Location,
    private videoServe: VideoService,
    private materialServe: MaterialsService,
  ) {
    this.addMaterialForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
    this.courseId = this.route.snapshot.paramMap.get('id') ?? '';
    this.courseName = this.route.snapshot.paramMap.get('course') ?? '';
  }


  // material change handle
  handleFileSelection(): void {
    const [file] = this.materialFileInput?.nativeElement?.files as any as File[];
    if (file) {
      this.selectedMaterialFile = file;
    }
  }

  async uploadVideoMaterial(): Promise<void> {
    try {
      if (!this.selectedMaterialFile) {
        this.toast.info("Please select the file");
        return;
      }
      this.fileUploadLoader = true;
      const data = {
        fileName: this.selectedMaterialFile.name,
        fileType: this.selectedMaterialFile.type,
        folder: 'material'
      }
      this.loader.show();
      this.preSignedUrl = await this.videoServe.getPreSignedUrl(data);
      this.loader.hide();
      const url = await this.videoServe.getAwsVideoUrl(this.preSignedUrl.url, this.selectedMaterialFile);
      this.awsVideoUrl = environment.VIDEO_DOMAIN_URL + this.selectedMaterialFile.name
      this.addMaterialForm.value["material"] = this.awsVideoUrl;
      this.createMaterials();
    } catch (error: any) {
      console.log(error);
      this.toast.error("Fail to upload")
    } finally {
      this.loader.hide();
      this.fileUploadLoader = false;
    }
  }

  async createMaterials(): Promise<void> {
    try {
      this.loader.show();
      const data = this.addMaterialForm.value;
      data.course = this.courseId;
      // creating material
      await this.materialServe.createCourseMaterial(data);
      this.toast.success('Created');
      this.goBack();
    } catch (error: any) {
      console.log(error);
      this.toast.error(error.error.message)
    } finally {
      this.loader.hide();
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
  }

}
