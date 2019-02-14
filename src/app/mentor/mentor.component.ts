import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'app-pm',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.css']
})
export class MentorComponent implements OnInit {
  board: any;
  errorMessage: string;
  id: string;
  message: string;

  constructor(private userService: UserService, private route: ActivatedRoute, private trainingService: TrainingService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.userService.getMentorBoard(this.id).subscribe(
      data => {
        this.board = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

  onConfirm(id, tstatus) {
    console.log('on Confirm');
    console.log('id: ' + id);
    console.log('status: ' + tstatus);

    this.trainingService.updateStatus(id, tstatus).subscribe(
      data => {
        console.log(data);
        this.message = data;
      },
      error => {
        console.log(error);
      }
    );

    setTimeout(function() {
      window.location.reload();
    }, 1000);

  }
}
