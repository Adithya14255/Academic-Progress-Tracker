import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Faculty_table } from '../../interfaces/faculty';
import { User } from '../../interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, style, transition, animate } from '@angular/animations'; // Updated import

@Component({
  selector: 'app-faculty-table',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './faculty-table.component.html',
  styleUrls: ['./faculty-table.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ backgroundColor: '', opacity: 0 }),
        animate(1000, style({ backgroundColor: 'white', opacity: 1 }))
      ])
    ])
  ],
})

export class FacultyTableComponent {
  data: Faculty_table[] = [{uid:0,course_code:'',course_name:'',status_code:3,hours_completed:0,topic:'',topic_id:0,outcome:''},{uid:0,course_code:'',course_name:'',status_code:3,hours_completed:0,topic:'',topic_id:0,outcome:''},{uid:0,course_code:'',course_name:'',status_code:3,hours_completed:0,topic:'',topic_id:0,outcome:''}];
  userdata: User = {uid:0,name:'',role_id:0,department_id:0};
  boxcolor: string = 'white';
  editedIndex: number | null = null;
  hourschange: number = 0;
  checkoutForm = this.formBuilder.group({
    handler_id:0,
    topic_id:0,
    hours_completed:0
  });
  constructor(private location:Location,private formBuilder: FormBuilder,private apiService: ApiService,private router:Router) {}
  ngOnInit(): void {
    const state = this.location.getState();
    if (typeof state === 'object' && state !== null) {
    this.userdata = state as User;
  }console.log(this.userdata)
    this.apiService.getFacultyData(this.userdata.uid).subscribe(
      response => {
        this.data = response;
      });
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

  hoursupdate(hourschange:number,topic_id:number,uid:number){
    this.editedIndex=null;
    if (topic_id==0){
      return;
    }
    this.checkoutForm.patchValue({
      handler_id:uid,
      topic_id: topic_id,
      hours_completed: hourschange
    });
    this.apiService.updateHoursCompletedDetails(this.checkoutForm.value).subscribe();
    console.log(this.checkoutForm.value);
    this.router.navigateByUrl('/faculty-table', { state: this.data }).then(() => {
      window.location.reload();
    });
    console.log(this.checkoutForm.value);
}

  editItem(index: number) {
    this.editedIndex = index;
    this.hourschange=0;
  }
}
