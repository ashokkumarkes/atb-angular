import { Component } from '@angular/core';
import { CommonServiceService } from '../../common-service.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-hsn-code-list',
  imports: [CommonModule],
  templateUrl: './hsn-code-list.component.html',
  styleUrl: './hsn-code-list.component.css'
})
export class HsnCodeListComponent {
  hsnCodeList: any[] = [];
  page = 1;
  limit = 20;
  total = 0;
  loading = false;

  constructor(private commonService: CommonServiceService) {}
  ngOnInit() {
    this.fetchHsnCodeList();
  } 
  fetchHsnCodeList() {
    if (this.loading) return;
    if (this.total && this.hsnCodeList.length >= this.total) return;

    this.loading = true;
    this.commonService.getHsnCodeList(this.page, this.limit).subscribe(
      (response: any) => {
        // this.hsnCodeList = response.data;
      this.hsnCodeList = [...this.hsnCodeList, ...response.data];
      this.total = response.total;
      this.page++;
      this.loading = false;
      },  
      (error) => {
        console.error('Error fetching HSN code list:', error);
      }
    );
  }

  onScroll(event: any) {
    const scrollTop = event.target.scrollTop;
    const scrollHeight = event.target.scrollHeight;
    const clientHeight = event.target.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 10) { // bottom reached
      this.fetchHsnCodeList();
    }
  }
}
