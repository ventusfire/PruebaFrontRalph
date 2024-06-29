import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiURL = 'https://jsonplaceholder.typicode.com/users';
  http = inject(HttpClient);

  getUsers(){
    return this.http.get<IUser[]>(this.apiURL)
  }
}
