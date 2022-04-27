import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
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
export class VideoUploadFormComponent implements OnInit, OnChanges {
  @ViewChild('videoFile') videoFileInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('videoThumbnail') fileInput: ElementRef<HTMLInputElement> | undefined;
  courseId = '';
  selectedImagePreviewURL: any = "";
  selectedFile: any;
  selectedVideoFile: any;
  preSignedUrl: any;
  awsVideoUrl: any;
  @Input() formDetails: any;
  constructor(
    private loader: LoaderService,
    private toast: ToastrService,
    private videoServe: VideoService,
    private sanitizer: DomSanitizer,
  ) { }

  // image change handle
  handleVideoFileSelection(): void {
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
      const data = {
        fileName: this.selectedVideoFile.name,
        fileType: this.selectedVideoFile.type,
      }
      this.loader.show();
      this.preSignedUrl = await this.videoServe.getPreSignedUrl(data);
      console.log(this.preSignedUrl?.url);

      const url = await this.videoServe.getAwsVideoUrl(this.preSignedUrl.url, this.selectedVideoFile);
      this.awsVideoUrl = environment.VIDEO_DOMAIN_URL + this.selectedVideoFile.name

    } catch (error: any) {
      console.log(error);
      this.toast.error("Fail to upoload")
    } finally {
      this.loader.hide();
    }
  }

  ngOnChanges(): void {
    this.getPreviousStepFormDetails();
  }

  private getPreviousStepFormDetails(): void {
    // this.formDetails = this.videoServe.videoFormDetails;
    console.log(this.formDetails);
  }

  ngOnInit(): void {
    this.getPreviousStepFormDetails();
  }

}
