import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { TokenStorageService } from '../auth/token-storage.service';
import { SearchInfo } from './search-info';
import { TrainingInfo } from '../training/training-info';
import { SkillsService } from '../services/skills.service';
import { TrainingService } from '../services/training.service';
import { NgProgress } from 'ngx-progressbar';
import { Mentor } from "./mentor.model";
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info: any;
  form: any = {};
  searchInfo: SearchInfo;
  trainingInfo: TrainingInfo;
  searchData: any;
  pMessage: string;
  errorMessage: string;
  searchFailed = false;
  displayedColumns: string[] = ['username', 'yearsExp', 'trainingsDelivered', 'fee', 'action'];
  mentorInfoTable : Mentor[] = [];
  mentorInfoTableDataSource: any;
  isLoading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private token: TokenStorageService, private skillsService: SkillsService, private trainingService: TrainingService, public ngProgress: NgProgress) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.form = {
      starttime: "14:00",
      endtime: "16:00"
    };
  }

  onSearch() {
    console.log(this.form);

    const starttime = Number(this.form.starttime.replace(':', ''));
    const endtime = Number(this.form.endtime.replace(':', ''));

    this.searchInfo = new SearchInfo(
      this.form.skill,
      starttime,
      endtime);

    this.ngProgress.start();
    this.skillsService.searchSkill(this.searchInfo).subscribe(
      data => {
        this.ngProgress.done();
        this.searchData = data;
        this.mentorInfoTable = [];
        for (var i = 0; i < this.searchData.length; i++) {
          this.mentorInfoTable[i] = this.searchData[i].mentor;
          this.mentorInfoTable[i].skillId = this.searchData[i].skillId;
          this.mentorInfoTable[i].userId = this.searchData[i].userId;
        }
        this.searchData.length > 0 ? this.isLoading = false : this.isLoading = true;
        this.mentorInfoTableDataSource = new MatTableDataSource(this.mentorInfoTable);
        this.mentorInfoTableDataSource.data = this.mentorInfoTable;

        this.mentorInfoTableDataSource.paginator = this.paginator;
        this.mentorInfoTableDataSource.sort = this.sort;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.searchFailed = true;
      }
    );
  }

  onPropose(user, mentor, skill) {
    this.trainingInfo = new TrainingInfo(
      user,
      mentor,
      skill);

    this.ngProgress.start();
    this.trainingService.propose(this.trainingInfo).subscribe(
      data => {
        this.ngProgress.done();
        console.log(data);
        this.pMessage = data;

        setTimeout(function() {
          window.location.reload();
        }, 2000);
      },
      error => {
        console.log(error);


      }
    );
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }
}
