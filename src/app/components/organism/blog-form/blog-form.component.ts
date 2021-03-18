import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { BlogServices } from 'src/app/services/blog';

@Component({
	selector: 'app-blog-form',
	templateUrl: './blog-form.component.html',
	styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent implements OnInit {
	blogForm: FormGroup;
	loading = false;
	success = false;
	error = '';
	

	constructor(private formBuilder: FormBuilder, private blogServices: BlogServices) {}

	ngOnInit(): void {
		this.blogForm = this.formBuilder.group({
			title: ['', Validators.required],
			name: ['', Validators.required],
			mainbody: ['', Validators.required]
		})
	}

	get form() { return this.blogForm.controls }

	onSubmit() {
		this.loading = true;

		console.log('submitted');

		if (this.blogForm.invalid) {
			console.log('returning');
			return;
		}

		this.blogServices.create({
			title: this.form.title.value,
			date: (new Date()).toISOString(),
			name: this.form.name.value,
			mainbody: this.form.mainbody.value
		}).pipe(first()).subscribe( data => {
			this.loading = false;
			this.success = true;
		})
	}

}
