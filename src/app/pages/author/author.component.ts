import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthorService } from 'src/app/services/author/author.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  authorList: any[] = [];
  constructor(
    private authorServe: AuthorService,
    private loader: LoaderService,
    private toast: ToastrService
  ) { }


  // get author list
  async getAuthorlist(): Promise<void> {
    try {
      this.loader.show();
      const data = await this.authorServe.getAuthors();
      this.authorList = data.authors;
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to fetch Authors')
    } finally {
      this.loader.hide();
    }
  }

  // delete author
  async deleteAuthor(id: string): Promise<void> {
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
        await this.authorServe.deleteAuthor(id);
        this.toast.success('Deleted');
        this.getAuthorlist();
      } catch (error) {
        console.log(error, 'fail to delete');
        this.toast.error('Fail to Delete');
      }
    }
  }


  ngOnInit(): void {
    this.getAuthorlist();
  }

}
