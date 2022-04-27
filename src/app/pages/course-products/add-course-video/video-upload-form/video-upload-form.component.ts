import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { VideoService } from 'src/app/services/video/video.service';

@Component({
  selector: 'app-video-upload-form',
  templateUrl: './video-upload-form.component.html',
  styleUrls: ['./video-upload-form.component.scss']
})
export class VideoUploadFormComponent implements OnInit {
  @ViewChild('videoFile') fileInput: ElementRef<HTMLInputElement> | undefined;

  selectedFile: any;
  preSignedUrl: any;
  awsVideoUrl: any;

  constructor(
    private loader: LoaderService,
    private toast: ToastrService,
    private videoServe: VideoService,
  ) { }

  // image change handle
  handleFileSelection(): void {
    const [file] = this.fileInput?.nativeElement?.files as any as File[];
    if (file) {
      this.selectedFile = file;
    }
  }

  async uploadVideo(): Promise<void> {
    try {
      if (!this.selectedFile) {
        this.toast.info("Please select the file");
        return;
      }
      const data = {
        fileName: this.selectedFile.name,
        fileType: this.selectedFile.type,
      }
      this.loader.show();
      this.preSignedUrl = await this.videoServe.getPreSignedUrl(data);
      console.log(this.preSignedUrl?.url);

      this.awsVideoUrl = await this.videoServe.getAwsVideoUrl(this.preSignedUrl.url, this.selectedFile);
      console.log(this.awsVideoUrl);


    } catch (error: any) {
      console.log(error);
      this.toast.error("Fail to upoload")
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {
  }

}
