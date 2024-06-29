import { Component, inject, OnInit } from '@angular/core';
import { CardUserComponent } from '../../components/card-user/card-user.component';
import { IUser } from '../../interfaces/IUser.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardUserComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  usersService = inject(UsersService)

  users:IUser[] = [];
  userCopy:IUser[] = [];

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this.usersService.getUsers().subscribe(
      (res) => {
        this.users = res.map(({ name, username, email, phone }) => {
          return {
            name: name,
            username: username,
            email: email,
            phone: phone
          }
        });
        this.userCopy = this.users;
      }
    )
  }

  search(enter: any): void {
    const searching: string = enter.target.value;
    this.users = this.userCopy.filter(({ name, username, phone, email }) => {
      const allvalues = [ name, username, phone, email]
        .map((resMap) => resMap.toLowerCase()).filter((val) =>
      val !== undefined)
      return allvalues.some((value) =>value.includes(searching))
    });
  }

}
