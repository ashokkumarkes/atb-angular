import { Component } from '@angular/core';
import { CommonServiceService } from '../../common-service.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-country-code',
  imports: [CommonModule],
  templateUrl: './country-code.component.html',
  styleUrl: './country-code.component.css'
})
export class CountryCodeComponent {
  title = 'Country Code List';
  constructor(private commonServie : CommonServiceService) { }
  countryList:any[] = [];
  ngOnInit() {
    this.getCountryList();
  }

  getCountryList(){
    this.commonServie.getCountryList().subscribe((res:any)=>{
      this.countryList = res.data;
    })
  }
}
