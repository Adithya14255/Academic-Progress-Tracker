import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';
import { User } from '../../interfaces/user';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { DomainMentor } from '../../interfaces/domainmentor';
import { trigger, style, transition, animate } from '@angular/animations'; // Updated import

@Component({
  selector: 'app-domain-mentor-portal-table',
  standalone: true,
  imports: [CommonModule, HeaderComponent,FormsModule],
  templateUrl: './domain-mentor-portal-table.component.html',
  styleUrls: ['./domain-mentor-portal-table.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ backgroundColor: '', opacity: 0 }),
        animate(1000, style({ backgroundColor: 'white', opacity: 1 }))
      ])
    ])
  ],
})
export class DomainMentorPortalTableComponent {
  data: any;
  userdata: any;
  name: string = '';
  domain_id: number = 0;
  displayCourseData:any = {course_code:'',course_name:''};
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
    this.userdata = state;
    console.log(this.userdata);
  }
    if (this.userdata){
    this.name = this.userdata.name;
    this.domain_id = this.userdata.domain_id;
    this.apiService.getDomainMentorData(this.userdata.domain_id).subscribe(
      response => {
        this.data = response;
        this.displayCourseData.course_code = this.data[0].course_code;
        this.displayCourseData.course_name = this.data[0].course_name; 
      });
    }
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
      case 4:
        return 'darkblue';
      default:
        return 'white'; // Default color
    }
  }
  navigateWithData(): void {
    this.router.navigateByUrl('/domain-mentor', { state: this.userdata });
  }
}