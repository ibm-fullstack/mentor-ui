import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { UserService } from '../services/user.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AdminBoardInfo } from "./adminboard.model";
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  board: any;
  errorMessage: string;
  displayedColumns: string[] = ['user', 'action'];
  adminBoardInfoTable : AdminBoardInfo[] = [];
  adminBoardInfoTableDataSource: any;
  message: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, public ngProgress: NgProgress) { }

  ngOnInit() {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.board = data;
        console.log(data);
        this.adminBoardInfoTable = [];
        for (var i = 0; i < this.board.length; i++) {
          this.adminBoardInfoTable.push(new AdminBoardInfo());
          this.adminBoardInfoTable[i].user = this.board[i].username;
          this.adminBoardInfoTable[i].active = this.board[i].active;
        }
        this.adminBoardInfoTableDataSource = new MatTableDataSource(this.adminBoardInfoTable);
        this.adminBoardInfoTableDataSource.data = this.adminBoardInfoTable;

        this.adminBoardInfoTableDataSource.paginator = this.paginator;
        this.adminBoardInfoTableDataSource.sort = this.sort;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

  onBlock(user) {

    this.ngProgress.start();
    this.userService.blockUser(user).subscribe(
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

  onUnblockUser(user) {

    this.ngProgress.start();
    this.userService.unblockUser(user).subscribe(
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
