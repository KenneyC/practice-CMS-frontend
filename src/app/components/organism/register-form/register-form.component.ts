import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterDetails } from 'src/app/models/register';
import { AuthenticationService } from 'src/app/services/auth';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['./register-form.component.scss', '../../../app.component.scss']
})
export class RegisterFormComponent implements OnInit {
	registerForm: FormGroup;

	constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, 
		private router: Router, private authenticationService: AuthenticationService) { 
		
		if (this.authenticationService.currentUserValue) {
			this.router.navigate(['blog']);
		}
		
	}

	ngOnInit(): void {
		this.registerForm = this.formBuilder.group({
			email: [''],
			username: [''],
			password: ['']
		})
	}

	get form() { return this.registerForm.controls}

	onSubmit() {
		const registerDetails: RegisterDetails = {
			username: this.form.username.value,
			password: this.form.password.value,
			email: this.form.email.value
		}
		this.authenticationService.register(registerDetails)
			.pipe(first())
			.subscribe(
				data => {
					this.router.navigate(['/'])
				}, 
				error => {
					console.log(error);
				}
			)
	}

}
