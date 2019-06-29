import { AppValidators } from './../../../shared/validators/app-validators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import * as cartActions from './../../actions/cart.actions';
import * as fromOrder from './../../reducers/order';
import { BooksService } from '../../../core/services/books.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  attendee= <any>[];
  seats: number;
  form: FormGroup;
  identity: FormGroup;
  shipping: FormGroup;
  billing: FormGroup;
  submitted: boolean = false;

  @Output() formSubmitted:EventEmitter<any> = new EventEmitter();
  

  constructor(private fb: FormBuilder, private shared: BooksService) { }

  ngOnInit() {
    this.seats = this.shared.availableSeats;
    this.identity = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      email: ['',[Validators.required,AppValidators.email()]],
      phone: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      seats: ['', [Validators.required, Validators.max(this.seats-1),]]
    });


    this.form = this.fb.group({
      sameAddress:true,
      identity: this.identity,

    });

    // pass initial data to the form, setvalue but we must pass all the object structutrue
    // we use patch value to pass partial obj 
    this.form.patchValue({
      identity: {
        firstName: "",
        lastName: ""
      }
    });
    
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.submitForm();
    }
  }

  submitForm() {
    if (this.form.valid) {
      this.formSubmitted.emit(this.form.value);
      console.log('Form Submitted successfully', this.attendee);
    }
  }

  isDisabled() {
    return this.submitted && this.form.invalid;
  }

  isSubmitted() {
    return this.submitted;
  }


  addMember(){
    this.attendee.member = <any> [];
    if(this.attendee.numAttendee >1 && this.attendee.numAttendee <= this.seats -1){
    for(var i=0; i< this.attendee.numAttendee; i++)
    this.attendee.member.push({name:''});
    return true;
    }
    }
}
