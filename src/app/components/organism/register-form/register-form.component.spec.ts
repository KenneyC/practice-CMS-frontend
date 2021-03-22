import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthenticationService } from 'src/app/services/auth';

import { RegisterFormComponent } from './register-form.component';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let mockAuthService = jasmine.createSpyObj('AuthenticationService', ['register']);

  beforeEach(async () => {
    mockAuthService.register.and.returnValue({});
    await TestBed.configureTestingModule({
      declarations: [ RegisterFormComponent ],
      providers: [
        {
          provide: Router, useValue: { navigate: () => {} }
        },
        {
          provide: ActivatedRoute, useValue: { params: of()}
        },
        {
          provide: AuthenticationService, useValue: mockAuthService
        },
        FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit register form when correct information is entered', () => {
    const fixture = TestBed.createComponent(RegisterFormComponent);

    const app = fixture.debugElement;
    const inputs = app.queryAll(By.css('input'));
    const button = app.nativeElement.querySelector('button');

    expect(inputs.length).toBe(3);
    expect(button).not.toBeNull();

    const email = inputs[0];
    const username = inputs[1];
    const password = inputs[2];

    email.nativeElement.value = "mock@mock.com";
    email.nativeElement.dispatchEvent(new Event('input'));
    username.nativeElement.value = "mockUser";
    username.nativeElement.dispatchEvent(new Event('input'));
    password.nativeElement.value = "password123";
    password.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    //button.click();
  
    fixture.whenStable().then(() => {
      expect(mockAuthService.register).toHaveBeenCalledTimes(1);
    })

  })
});
