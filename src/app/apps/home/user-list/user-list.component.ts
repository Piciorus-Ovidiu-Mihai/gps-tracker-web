import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/libs/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any = [];

  constructor(private userService: UserService) { }

  async ngOnInit() {
    await this.getUsers();
  }

  async getUsers(){
    const result = await this.userService.getUsers().toPromise();
    if(result) this.users = result;
  }

  hashCode(email: string) {
		let hash = 0;
		for (let i = 0; i < email.length; i++) {
			hash = email.charCodeAt(i) + ((hash << 5) - hash);
		}
		return hash;
	}

	intToRgb(i: number) {
		let c = (i & 0x00FFFFFF)
			.toString(16)
			.toUpperCase();

		return "#" + "00000".substring(0, 6 - c.length) + c;
	}

}
