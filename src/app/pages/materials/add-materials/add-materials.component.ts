import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/services/book/book.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { MaterialsService } from 'src/app/services/materials/materials.service';

@Component({
  selector: 'app-add-materials',
  templateUrl: './add-materials.component.html',
  styleUrls: ['./add-materials.component.scss']
})
export class AddMaterialsComponent implements OnInit {
  @ViewChild('materialFile') fileInput: ElementRef<HTMLInputElement> | undefined;
  selectedFilePreviewURL: any = "";
  pdfPeviewFile: any;
  selectedFile: any;
  createMaterialForm: FormGroup;
  booksCategory: any[] = [];
  zoomLevel = 0;
  formData = new FormData();

  constructor(
    private fb: FormBuilder,
    private bookServe: BookService,
    private materialServe: MaterialsService,
    private sanitizer: DomSanitizer,
    private loader: LoaderService,
    private toast: ToastrService,
    private router: Router
  ) {
    this.createMaterialForm = this.fb.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      preferredYear: ['', [Validators.required]],
      restrictCount: [''],
      description: [''],
      file: null
    })
  }

  // get books category
  async getBooksCategory(): Promise<void> {
    try {
      this.booksCategory = await this.bookServe.getBooksCategory();
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to fetch Books Category')
    }
  }

  // image change handle
  handleFileSelection(): void {
    const [file] = this.fileInput?.nativeElement?.files as any as File[];
    if (file) {
      this.selectedFile = file;
      this.selectedFilePreviewURL = file.name;
      this.pdfPeviewFile = null;
    }
  }

  // remove selected file
  removeSelectedFile(): void {
    this.selectedFile = null;
    this.selectedFilePreviewURL = '';
    return;
  }

  // view preview pdf
  viewPreviewPdf(): void {
    const url = window.URL.createObjectURL(this.selectedFile);
    this.pdfPeviewFile = url;
  }

  // open file input
  openFileSelectionDialog(): void {
    this.fileInput?.nativeElement?.click();
  }

  // increase zoom

  increaseZoomLevel(): any {
    if (this.zoomLevel > 5) {
      return;
    }
    this.zoomLevel += 1;
  }

  // decrease zoom level
  decreaseZoomLevel(): any {
    if (this.zoomLevel < 0) {
      return;
    }
    this.zoomLevel -= 1;
  }

  // on submiting the form
  async uploadMaterial(): Promise<void> {
    try {
      // checking image file
      if (this.selectedFile == null || undefined) {
        this.toast.info('Please select the file')
        return;
      };
      this.updateFormData();
      this.loader.show();
      await this.materialServe.uploadMaterials(this.formData);
      this.toast.success('uploaded');
      this.router.navigate(['/materials'])
    } catch (error: any) {
      this.toast.error(error?.error?.message)
      console.log(error);
    } finally {
      this.loader.hide();
    }
  }

  // update form data
  updateFormData(): void {
    const formValues = this.createMaterialForm.value;
    Object.entries(formValues).forEach(([key, value]: any) => {
      if (Array.isArray(value)) {
        value.forEach(v => {
          this.formData.append(key, v);
        })
      } else {
        this.formData.append(key, value);
      }
    })
    this.formData.append('file', this.selectedFile);
  }

  ngOnInit(): void {
    this.getBooksCategory();
  }

}
