import { Component, inject, effect, signal, computed } from '@angular/core';
import { CardUserComponent } from '../../components/card-user/card-user.component';
import { IUser } from '../../interfaces/IUser.interface';
import { UsersService } from '../../services/users.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardUserComponent,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  usersService = inject(UsersService)

  users = signal<IUser[]>([])
  searchInput = signal<string>('');

  constructor(){
    effect(() => {
      this.usersService.getUsers().subscribe(
        (res) =>  {
          this.users.set(res)
        }
      )
    })
  }

  filteredUsers = computed(() => {
    const search = (this.searchInput().valueOf() || '').toString();
    return this.users().filter((user) => user.name.toLocaleLowerCase().includes(search)
    )
  })

}
