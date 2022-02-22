import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../model/user.model';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../userService/user.service';
import {SignUpService} from '../sign-upService/sign-up.service';
import {MatHorizontalStepper, MatStepper} from '@angular/material/stepper';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmailValidation, MustMatch} from './validatore';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide = true;
  hideConfirmPassword = true;

  public userURl: string;
  public user;
  public mode: number = 0;
  public existingEmailsList: any = [];
  public email: any = [];
  public emails;
  public inData: boolean = false;
  public completed: boolean = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  data: any;

  registerForm: any;
  checked = false;
  public inDataMatInput: boolean = false;
  title: string = "Register - Digi Blood";


  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              public signupService: SignUpService,
              public userService: UserService,
              private _formBuilder: FormBuilder,
              private formBuilder: FormBuilder,
              private titleService: Title) {

    this.userURl = "http://localhost:8086/register";
    this.user = new User();

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmPassword: ['', Validators.required],
      phoneNumber: [null, Validators.required]
      //acceptTerms: [false, Validators.requiredTrue]
    }, {validator: MustMatch('password', 'confirmPassword')});
  }

  @ViewChild('stepper', {static: true}) stepper: MatStepper;
  isLinear = true;
  public formGroup: FormGroup;

  onButton() {
    this.stepper.selected.completed = true;
    this.stepper.next();
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.firstFormGroup = this.registerForm;
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  public onSignUp(user: User) {
    return this.http.post<User>(this.userURl, user);
  }

  onSubmit() {
    this.userService.save(this.user).subscribe(result => {
      this.gotoUserList();
    });
  }

  onCompleted() {
    this.completed = true;
  }

  checkEmail(event: any) {
    let i: number = 0;
    this.emails = event.target.value;
    for (let e in this.email) {
      //
      if (this.emails == this.email[i]) {
        this.inData = true;
        console.log("emails" + this.emails);
        console.log(this.email[i]);
        break;
      } else {
        this.inData = false;
        console.log("false");
      }
      i++;
    }
  }

  CheckEmailFromMatInput() {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls.email.value;
      let i: number = 0;
      for (let r in this.email) {
        //
        if (control == this.email[i]) {
          this.inDataMatInput = true;
          console.log("emails" + this.emails);
          console.log(this.email[i]);
          break;
        } else {
          this.inData = false;
          console.log("false");
        }
        i++;
      }
    }
  }

  gotoUserList() {
    this.router.navigateByUrl('/users');
  }

  goToExistingMail() {
    this.router.navigateByUrl('/existing mail');
  }
}

function EmailCheck() {
  return (formGroup: FormGroup) => {
    let control = formGroup.controls.email.value;
    let j: number = 0;
    for (let m in this.email) {
      //
      if (control == this.email[j]) {
        this.inData = true;
        console.log("emails" + this.emails);
        console.log(this.email[j]);
        break;
      } else {
        this.inData = false;
        console.log("false");
      }
      j++;
    }


  }

}
