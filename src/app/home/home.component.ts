import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { TokenStorageService } from '../auth/token-storage.service';
import { SearchInfo } from './search-info';
import { TrainingInfo } from '../training/training-info';
import { SkillsService } from '../services/skills.service';
import { TrainingService } from '../services/training.service';

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

  constructor(private token: TokenStorageService, private skillsService: SkillsService, private trainingService: TrainingService) { }

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

    this.skillsService.searchSkill(this.searchInfo).subscribe(
      data => {
        this.searchData = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  onPropose(user, mentor, skill) {
    this.trainingInfo = new TrainingInfo(
      user,
      mentor,
      skill);

    this.trainingService.propose(this.trainingInfo).subscribe(
      data => {
        console.log(data);
        this.pMessage = data;
      },
      error => {
        console.log(error);
      }
    );

    setTimeout(function() {
      window.location.reload();
    }, 5000);
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }
}
