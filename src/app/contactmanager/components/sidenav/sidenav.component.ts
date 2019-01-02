import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material';


const SMALL_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  users: Observable<User[]>;
  isDarkTheme: boolean = false;
  dir: string = 'ltr';

  constructor( 
    private userService: UserService,
    private router: Router
    ) {
    
   }

   @ViewChild(MatDrawer) drawer: MatDrawer;

   toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
   }

   toggleDir() {
     this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
   }

  ngOnInit() {
    this.users = this.userService.users;
    this.userService.loadAll();

    // this.users.subscribe(data => {
    //   console.log(data);
    //   if (data.length > 0) {
    //     this.router.navigate(['/contactmanager', data[0].id]);
    //   }
    // });

    this.router.events.subscribe(() => {
      if (this.isScreenSmall())
        //TODO close our sidenav
        this.drawer.close();
    })
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches
  }

}
