import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';
import { User } from '../../interfaces/user';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { DomainMentor } from '../../interfaces/domainmentor';

@Component({
  selector: 'app-domain-mentor-portal-table',
  standalone: true,
  imports: [CommonModule, HeaderComponent,FormsModule],
  templateUrl: './domain-mentor-portal-table.component.html',
  styleUrls: ['./domain-mentor-portal-table.component.css']
})
export class DomainMentorPortalTableComponent {
  data: DomainMentor[] = [{mentor_id:0,uid:0,course_code:'',course_name:'',status_code:1,url:'',topic:'',topic_id:0,outcome:'',comment:''}];
  userdata: User = {uid:0,name:'',role_id:0,department_id:0};
  boxcolor: string = 'white';
  editedIndex: number | null = null;
  comment: string = '';
  checkoutForm = this.formBuilder.group({
    handler_id:0,
    topic_id:0,
    comment:''
  });

  constructor(private location:Location,private formBuilder: FormBuilder,private apiService: ApiService,private router:Router) {}
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

  approveupdate(topic_id: number, uid: number): void {
    this.editedIndex=null;
    this.checkoutForm.patchValue({
      handler_id:uid,
      topic_id: topic_id,
      comment:''
    });
    this.apiService.updateCommentDetails(1,this.checkoutForm.value).subscribe();
    console.log(this.checkoutForm.value);
    this.router.navigateByUrl('/domain-mentor-table', { state: this.data }).then(() => {
      window.location.reload();
    });
  }

  disapproveupdate(index: number): void {
    this.editedIndex = index;
  }

  commentupdate(comment: string,topic_id: number,uid:number){
    this.editedIndex=null;
    if(topic_id==0){
        return;
    }
    this.checkoutForm.patchValue({
      handler_id:uid,
      topic_id: topic_id,
      comment:comment
    });
    this.apiService.updateCommentDetails(0,this.checkoutForm.value).subscribe();
    console.log(this.checkoutForm.value);
    this.router.navigateByUrl('/domain-mentor-table', { state: this.data }).then(() => {
      window.location.reload();
    });
    console.log(this.checkoutForm.value);

  }
  getBoxColor(value: number): string {
    switch (value) {
      case 0:
        return 'white';
      case 1:
        return 'orange';
      case 2:
        return 'red';
      case 3:
        return 'green';
      default:
        return 'white'; // Default color
    }
  }

}