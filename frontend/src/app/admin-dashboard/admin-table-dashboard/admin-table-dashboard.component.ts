import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { FormBuilder } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ApiService } from '../../api.service';
import { ActivatedRoute } from '@angular/router';
import { DomainMentor } from '../../interfaces/domainmentor';

@Component({
  selector: 'app-admin-table-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-table-dashboard.component.html',
  styleUrl: './admin-table-dashboard.component.css'
})

export class AdminTableDashboardComponent {
    data: DomainMentor[] = [{mentor_id:0,uid:0,course_code:'',course_name:'',status_code:3,url:'',topic:'',topic_id:0,outcome:'',comment:''}];
    userdata: User = {uid:0,name:'',role_id:0,department_id:0};
    boxcolor: string = 'white';
    constructor(private location:Location,private formBuilder: FormBuilder,private apiService: ApiService,private route: ActivatedRoute) {}
    ngOnInit(): void {
      const state = this.location.getState();
      if (typeof state === 'object' && state !== null) {
      this.userdata = state as User;
    }console.log(this.userdata)
      this.apiService.getDomainMentorData(this.userdata.uid).subscribe(
        response => {
          this.data = response;
        });
      }
    // tabKey: any = [];
    // tabValue: any = [];
    // materialIndex: number = -1;
    // HourIndex: number = -1;
    // ApproveIndex: number = -1;
  
    // getData() {
    //   this.array.forEach((element: any) => {
    //     this.tabKey = Object.keys(element);
    //     this.tabValue.push(Object.values(element));
    //     this.materialIndex = this.tabKey.findIndex((key: string) => key === 'Material');
    //     this.ApproveIndex = this.tabKey.findIndex((key: string) => key === 'Approve');
    //     this.HourIndex = this.tabKey.findIndex((key: string) => key === 'Hours');
    //   });
    // }
  
    onSelectChange(event: Event, rowIndex: Number) {
      const selectElement = event.target as HTMLSelectElement;
      if (selectElement.value === 'disapprove') {
        const reason = prompt('Please enter the reason for disapproval:');
        if (reason) {
          console.log(`Disapproval reason for row ${rowIndex}:`, reason);
          // Optionally store the reason in the array or take other actions
        } else {
          // If no reason provided, set the select value back to "approve"
          selectElement.value = 'approve';
        }
      }
    }
  }