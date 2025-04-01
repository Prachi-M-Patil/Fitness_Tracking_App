import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials ={
    username: '',
    password: ''

  };

  message: string | undefined;
  constructor(private authservice: AuthService, private router: Router, private route: ActivatedRoute

  ){}

  onSubmit(): void {
    this.authservice.login(this.credentials).subscribe(
      (response) => {
        this.message = response.message;
        alert('login successful');
        console.log('Login successful:', response);
        this.router.navigate(['/profile/createprofile']);
        
      },
      (error) => {
        this.message = 'Failed to login user';
        console.error('login error:', error);
      }
    );
    
  }
  loginWithGoogle(): void {
    alert('Google login triggered!');
    // Integrate actual Google OAuth logic here
  }

  loginWithApple(): void {
    alert('Apple login triggered!');
    // Integrate actual Apple OAuth logic here
  }

  loginWithFacebook(): void {
    alert('Facebook login triggered!');
    // Integrate actual Facebook OAuth logic here
  }

  toggleToRegister(): void {
    this.router.navigate(['/register']);
  }
}
  // register(){
  //   const userData = { username: this.username}
  // }


