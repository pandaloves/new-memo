import { JsonPipe } from '@angular/common';
import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { QuotesService } from '../../../services/quotes.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, RouterLink, CommonModule],
  templateUrl: './quote-form.component.html',
  styleUrl: './quote-form.component.css',
})
export class QuoteFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  quoteformSubscription!: Subscription;
  paramsSubscription!: Subscription;
  quoteService = inject(QuotesService);

  id = 0;

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private toasterService: ToastrService
  ) {}

  // Handle the quote form submission
  onSubmit() {
    if (this.form.invalid) {
      this.toasterService.error('Vänligen fyll i alla obligatoriska fält.');
      return;
    }

    this.quoteformSubscription = this.quoteService
      .addQuote(this.form.value)
      .subscribe({
        next: () => {
          this.toasterService.success('Citatet har lagts till!');
          this.router.navigateByUrl('/quotes');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnDestroy(): void {
    if (this.quoteformSubscription) {
      this.quoteformSubscription.unsubscribe();
    }
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      author: ['', Validators.required],
      content: ['', Validators.required],
    });

    this.paramsSubscription = this.activatedRouter.params.subscribe({
      next: (response) => {
        let id = response['id'];
        this.id = id;
        if (!id) return;

        // Fetch the quote data using the ID
        this.quoteService.getQuote(id).subscribe({
          next: () => {
            this.form.patchValue(response);
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
