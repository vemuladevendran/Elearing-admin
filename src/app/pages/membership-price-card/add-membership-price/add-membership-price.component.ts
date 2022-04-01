import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-add-membership-price',
  templateUrl: './add-membership-price.component.html',
  styleUrls: ['./add-membership-price.component.scss']
})
export class AddMembershipPriceComponent implements OnInit {
  cardId = "";
  membershipPriceForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private loader: LoaderService,
  ) { 
    this.membershipPriceForm = this.fb.group({
      planName: ['', [Validators.required]],
      years: ['', [Validators.required]],
      price: ['', [Validators.required]],
    })
  }


  async createPriceCard():Promise<void>{
    try {
      console.log(this.membershipPriceForm.value);
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message);
    }finally{
      this.loader.hide();
    }
  }

  ngOnInit(): void {
  }

}
