import { Component } from '@angular/core';
import { CommonServiceService } from '../../common-service.service';
import { FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-hsn-code',
  imports: [ReactiveFormsModule],
  templateUrl: './hsn-code.component.html',
  styleUrl: './hsn-code.component.css'
})
export class HsnCodeComponent {
  constructor(private commonService: CommonServiceService) {}
  hsnData: any
  hsnCodeForm  = new FormGroup({
    stateID: new FormControl(''),
    hsnCode: new FormControl(''),
    description: new FormControl(''),

    gstRate: new FormControl(''),
    sgstRate: new FormControl(''),

    igstRate: new FormControl(''),
    cgstRate: new FormControl(''),
    cessRate: new FormControl(''),
  });
  ngOnInit() {}
  onSubmit(){
    this.hsnData = this.hsnCodeForm;
    this.commonService.addHsnCode(this.hsnData).subscribe((res:any)=>{
      if(res.status===true){
        alert("Hsn Code Added Successfully")
      }
    })    
  }
}
