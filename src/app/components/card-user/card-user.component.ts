import { Component, Input } from '@angular/core';
import { IUser } from '../../interfaces/IUser.interface';
import { SiglaPipe } from '../../pipes/sigla.pipe';

@Component({
  selector: 'app-card-user',
  standalone: true,
  imports: [
    SiglaPipe
  ],
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.css'
})
export class CardUserComponent {

  @Input({ required: true }) user!: IUser;

}
