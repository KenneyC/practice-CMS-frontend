import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth';
import { first } from 'rxjs/operators';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss', '../../../app.component.scss']
})

export class LoginForm implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor (private formBuilder: FormBuilder, private route: ActivatedRoute, 
        private router: Router, private authenticationService: AuthenticationService) {
            this.returnUrl = '';
            if (this.authenticationService.currentUserValue) {
                this.router.navigate(['/blog']);
            }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        })

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get form() { return this.loginForm ? this.loginForm.controls : null }

    onSubmit() {
        this.submitted = true;

        this.loading = true;
        
        if (!this.form || this.loginForm.invalid) {
            this.loading = false;
            return;
        }

        this.authenticationService.login(this.form.username.value, this.form.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/newBlog']);
                    this.loading = false;
                },
                error => {
                    console.log(error);
                    this.error = error;
                    this.loading = false;
                }
            )
    }


}