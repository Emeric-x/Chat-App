import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import { SHA256, enc } from 'crypto-js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  ErrorMsg: string | undefined
  selectedFile : File | undefined

  constructor(private UsersService: UsersService, private Router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  async SignUp(sNewUserFirstname: string, sNewUserLastname: string, sNewUserLogin: string, sNewUserPassword: string){
    if(sNewUserFirstname && sNewUserLastname && sNewUserLogin && sNewUserPassword){
      let hashPassword = SHA256(sNewUserPassword).toString(enc.Hex)

      if(await this.UsersService.LoginAlreadyUsed(sNewUserLogin)){
        this.ErrorMsg = "This login is already used."
      } else {
        const newUser: User = {
          firstname: sNewUserFirstname,
          lastname: sNewUserLastname,
          login: sNewUserLogin,
          password: hashPassword,
          avatar: "ok"
        }
    
        this.UsersService.LoggedUserData = await this.UsersService.SignUpUser(newUser)
    
        if(this.UsersService.LoggedUserData){
          this.UsersService.isAuth = true
          this.Router.navigate(['/GroupsChat'])
        }
      }
    } else {
      this.ErrorMsg = "You must fill all the fields."
    }
  }

  onFileSelected(event: any){
    this.selectedFile = <File>event.target.files[0];
  }

  UploadImage(){
    const formData = new FormData()
    formData.append("image", this.selectedFile!, this.selectedFile!.name)

    //call api to upload
  }
}
