import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { TrainingService } from '../services/training.service';
import { NgProgress } from 'ngx-progressbar';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserBoardInfo } from "./userboard.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  board: any;
  errorMessage: string;
  id: string;
  message: string;
  displayedColumns: string[] = ['mentor', 'skill', 'status', 'progress', 'action'];
  userBoardInfoTable : UserBoardInfo[] = [];
  userBoardInfoTableDataSource: any;
  trainingStatus = [ 'ALL', 'PROPOSED', 'CONFIRMED', 'STARTED', 'COMPLETED'];
  selected : string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private route: ActivatedRoute,private trainingService: TrainingService, public ngProgress: NgProgress) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.trainingStatus);
    this.userService.getUserBoard(this.id).subscribe(
      data => {
        this.board = data;
        this.userBoardInfoTable = [];
        for (var i = 0; i < this.board.length; i++) {
          this.userBoardInfoTable[i] = this.board[i].mentor;
          this.userBoardInfoTable[i].id = this.board[i].id;
          this.userBoardInfoTable[i].mentor = this.board[i].mentor.username;
          this.userBoardInfoTable[i].skill = this.board[i].skills.name;
          this.userBoardInfoTable[i].status = this.board[i].status;
          this.userBoardInfoTable[i].progress = this.board[i].progress;
        }
        this.userBoardInfoTableDataSource = new MatTableDataSource(this.userBoardInfoTable);
        this.userBoardInfoTableDataSource.data = this.userBoardInfoTable;

        this.userBoardInfoTableDataSource.paginator = this.paginator;
        this.userBoardInfoTableDataSource.sort = this.sort;
        this.selected = 'ALL';
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

  applyFilter(filterValue: string) {
    if (filterValue === 'ALL') {
      filterValue = '';
    }
    this.userBoardInfoTableDataSource.filter = filterValue.trim();
  }

  onPay(id, tstatus) {
    console.log('on Pay');
    console.log('id: ' + id);
    console.log('status: ' + tstatus);

    this.ngProgress.start();
    this.trainingService.updateStatus(id, tstatus).subscribe(
      data => {
        this.ngProgress.done();
        console.log(data);
        this.message = data;

        setTimeout(function() {
          window.location.reload();
        }, 2000);
      },
      error => {
        console.log(error);
      }
    );
  }
}

@Component({
  selector: 'ngbd-progressbar-showvalue',
  templateUrl: './user.component.html',
  styles: [`
    ngb-progressbar {
      margin-top: 5rem;
    }
  `]
})
export class NgbdProgressbarShowvalue {
}
