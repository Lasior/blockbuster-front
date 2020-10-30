import { Component, OnInit } from '@angular/core';
import { Company } from './company';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  showID: boolean = false;

  companies: Company[];

  constructor(private companyService: CompanyService) { }

  switchId(): void {
    this.showID = !this.showID;
  }

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(
      companies => this.companies = companies
    );
  }
}
