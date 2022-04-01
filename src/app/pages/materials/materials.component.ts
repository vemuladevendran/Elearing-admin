import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { MaterialsService } from 'src/app/services/materials/materials.service';
import Swal from 'sweetalert2';
import { ViewMaterialComponent } from './view-material/view-material.component';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent implements OnInit {

  materialsList: any[] = [];

  constructor(
    private materialServe: MaterialsService,
    private loader: LoaderService,
    private toast: ToastrService,
    private dialog: MatDialog,
  ) { }


  // materials list
  async getMaterials(): Promise<void> {
    try {
      this.loader.show();
      this.materialsList = await this.materialServe.getMaterials();
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message);
    }
    finally {
      this.loader.hide();
    }
  }
  // opening view dialog
  openDialog(data: any) {
    const dialogRef = this.dialog.open(ViewMaterialComponent, {
      width: '630px',
      height: '590px',
      // panelClass: 'zero-padding-panel',
      data: {
        data
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
    });
  }

  // delete materila
  async deleteMaterial(id: string): Promise<void> {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        this.loader.show();
        await this.materialServe.deleteMaterial(id);
        this.toast.info('Deleted');
        this.getMaterials();
      } catch (error) {
        console.log(error, 'fail to delete');
        this.toast.error('fail to delete')
      } finally {
        this.loader.hide();
      }
    }
  }

  ngOnInit(): void {
    this.getMaterials();
  }

}
