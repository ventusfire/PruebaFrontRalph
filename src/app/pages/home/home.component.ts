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

  combinedSearch = computed(() => {
    const searchTerm = this.searchInput().valueOf() || '';
    return searchTerm.toLowerCase();
  });

  filteredUsers = computed(() => {
    const search = this.combinedSearch();
    return this.users().filter(({ name, username, phone, email }) => {
      const allValues = [name, username, phone, email]
        .map((val) => val.toLowerCase() )
        .filter((values) => values !== undefined)

      return allValues.some((values) => values.includes(search))
    })
  })

}
