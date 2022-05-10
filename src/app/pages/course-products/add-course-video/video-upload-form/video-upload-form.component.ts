import { Location } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { VideoService } from 'src/app/services/video/video.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-upload-form',
  templateUrl: './video-upload-form.component.html',
  styleUrls: ['./video-upload-form.component.scss']
})
export class VideoUploadFormComponent implements OnInit {
  @ViewChild('videoFile') videoFileInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('videoThumbnail') fileInput: ElementRef<HTMLInputElement> | undefined;
  courseId = '';
  selectedImagePreviewURL: any = "";
  selectedFile: any;
  selectedVideoFile: any;
  preSignedUrl: any;
  @Input() formDetails: any;
  formData = new FormData();
  processVideoLoaded = false;

  constructor(
    private loader: LoaderService,
    private toast: ToastrService,
    private videoServe: VideoService,
    private sanitizer: DomSanitizer,
    private location: Location,
  ) { }

  // video change handle
  handleVideoThumbnailSelection(): void {
    const [file] = this.fileInput?.nativeElement?.files as any as File[];
    if (file) {
      this.selectedFile = file;
      this.selectedImagePreviewURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    }
  }

  // open file input
  openFileSelectionDialog(): void {
    this.fileInput?.nativeElement?.click();
  }

  // video change handle
  handleFileSelection(): void {
    const [file] = this.videoFileInput?.nativeElement?.files as any as File[];
    if (file) {
      this.selectedVideoFile = file;
    }
  }

  async uploadVideo(): Promise<void> {
    try {
      if (!this.selectedVideoFile) {
        this.toast.info("Please select the file");
        return;
      }
      this.processVideoLoaded = true;
      const data = {
        fileName: this.selectedVideoFile.name,
        fileType: this.selectedVideoFile.type,
        folder: 'video'
      }
      this.loader.show();
      this.preSignedUrl = await this.videoServe.getPreSignedUrl(data);
      this.loader.hide();
      const url = await this.videoServe.getAwsVideoUrl(this.preSignedUrl.url, this.selectedVideoFile);
      const videoUrl = {
        key: this.preSignedUrl.key,
        url: environment.AWS_DOMAIN_URL + this.preSignedUrl.key
      }
      this.formDetails["video"] = videoUrl;
      // uploading data to database
      this.createNewVideo();
    } catch (error: any) {
      console.log(error);
      this.toast.error("Fail to upoload");
    } finally {
      this.processVideoLoaded = false;
    }
  }

  async createNewVideo(): Promise<void> {
    try {
      // checking image file
      if (this.selectedFile !== undefined) {
        this.updateFormData();
        this.loader.show();

        await this.videoServe.createCourseVideo(this.formData);
        this.toast.success('Created');
        this.goBack();
        return;
      };
      // without thumbnail image
      await this.videoServe.createCourseVideo(this.formDetails);
      this.toast.success('Created');
      this.goBack();
      return;
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error?.message);
    } finally {
      this.loader.hide();
    }
  }

  goBack(): void {
    this.location.back();
  }

  // update form data
  updateFormData(): void {
    const formValues = this.formDetails;
    Object.entries(formValues).forEach(([key, value]: any) => {
      if (Array.isArray(value)) {
        value.forEach(v => {
          this.formData.append(key, v);
        })
      } else {
        this.formData.append(key, value);
      }
    })
    // console.log(this.selectedFile, this.selectedFile, 'file checking')
    this.formData.append('videoThumbnail', this.selectedFile);
  }

  ngOnInit(): void {
  }

}
