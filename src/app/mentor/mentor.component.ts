import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { TrainingService } from '../services/training.service';
import { NgProgress } from 'ngx-progressbar';
import { MentorBoardInfo } from "./mentorboard.model";
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

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
  displayedColumns: string[] = ['user', 'skill', 'status', 'progress', 'action'];
  mentorBoardInfoTable : MentorBoardInfo[] = [];
  mentorBoardInfoTableDataSource: any;
  trainingStatus = [ 'ALL', 'PROPOSED', 'CONFIRMED', 'STARTED', 'COMPLETED'];
  selected : string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private route: ActivatedRoute, private trainingService: TrainingService, public ngProgress: NgProgress) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.userService.getMentorBoard(this.id).subscribe(
      data => {
        this.board = data;
        this.mentorBoardInfoTable = [];
        for (var i = 0; i < this.board.length; i++) {
          this.mentorBoardInfoTable.push(new MentorBoardInfo());
          this.mentorBoardInfoTable[i].id = this.board[i].id;
          this.mentorBoardInfoTable[i].user = this.board[i].user.username;
          this.mentorBoardInfoTable[i].skill = this.board[i].skills.name;
          this.mentorBoardInfoTable[i].status = this.board[i].status;
          this.mentorBoardInfoTable[i].progress = this.board[i].progress;
        }
        this.mentorBoardInfoTableDataSource = new MatTableDataSource(this.mentorBoardInfoTable);
        this.mentorBoardInfoTableDataSource.data = this.mentorBoardInfoTable;

        this.mentorBoardInfoTableDataSource.paginator = this.paginator;
        this.mentorBoardInfoTableDataSource.sort = this.sort;
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
    this.mentorBoardInfoTableDataSource.filter = filterValue.trim();
  }

  onStatusChange(id, tstatus) {
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
