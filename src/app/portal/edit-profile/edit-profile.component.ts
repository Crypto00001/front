import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  countryList: Array<any> = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'American Samoa',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antarctica',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas ',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia (Plurinational State of)',
    'Bonaire, Sint Eustatius and Saba',
    'Bosnia and Herzegovina',
    'Botswana',
    'Bouvet Island',
    'Brazil',
    'British Indian Ocean Territory ',
    'Brunei Darussalam',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cayman Islands ',
    'Central African Republic ',
    'Chad',
    'Chile',
    'China',
    'Christmas Island',
    'Cocos (Keeling) Islands ',
    'Colombia',
    'Comoros ',
    'Congo (the Democratic Republic of the)',
    'Congo ',
    'Cook Islands ',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Curaçao',
    'Cyprus',
    'Czechia',
    'Côte d\'Ivoire',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic ',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Falkland Islands  [Malvinas]',
    'Faroe Islands ',
    'Fiji',
    'Finland',
    'France',
    'French Guiana',
    'French Polynesia',
    'French Southern Territories ',
    'Gabon',
    'Gambia ',
    'Georgia',
    'Germany',
    'Ghana',
    'Gibraltar',
    'Greece',
    'Greenland',
    'Grenada',
    'Guadeloupe',
    'Guam',
    'Guatemala',
    'Guernsey',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Heard Island and McDonald Islands',
    'Holy See ',
    'Honduras',
    'Hong Kong',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran (Islamic Republic of)',
    'Iraq',
    'Ireland',
    'Isle of Man',
    'Italy',
    'Jamaica',
    'Japan',
    'Jersey',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Korea (the Democratic People\'s Republic of)',
    'Korea (the Republic of)',
    'Kuwait',
    'Kyrgyzstan',
    'Lao People\'s Democratic Republic ',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macao',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands ',
    'Martinique',
    'Mauritania',
    'Mauritius',
    'Mayotte',
    'Mexico',
    'Micronesia (Federated States of)',
    'Moldova (the Republic of)',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Montserrat',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands ',
    'New Caledonia',
    'New Zealand',
    'Nicaragua',
    'Niger ',
    'Nigeria',
    'Niue',
    'Norfolk Island',
    'Northern Mariana Islands ',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine, State of',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines ',
    'Pitcairn',
    'Poland',
    'Portugal',
    'Puerto Rico',
    'Qatar',
    'Republic of North Macedonia',
    'Romania',
    'Russian Federation ',
    'Rwanda',
    'Réunion',
    'Saint Barthélemy',
    'Saint Helena, Ascension and Tristan da Cunha',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Martin (French part)',
    'Saint Pierre and Miquelon',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Sint Maarten (Dutch part)',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Georgia and the South Sandwich Islands',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan ',
    'Suriname',
    'Svalbard and Jan Mayen',
    'Sweden',
    'Switzerland',
    'Syrian Arab Republic',
    'Taiwan',
    'Tajikistan',
    'Tanzania, United Republic of',
    'Thailand',
    'Timor-Leste',
    'Togo',
    'Tokelau',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Turks and Caicos Islands ',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates ',
    'United Kingdom of Great Britain and Northern Ireland ',
    'United States Minor Outlying Islands ',
    'United States of America ',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela (Bolivarian Republic of)',
    'Viet Nam',
    'Virgin Islands (British)',
    'Virgin Islands (U.S.)',
    'Wallis and Futuna',
    'Western Sahara',
    'Yemen',
    'Zambia',
    'Zimbabwe',
  ];
  generalForm: FormGroup;
  changePasswordForm: FormGroup;
  loading = false;
  generalFormSubmitted = false;
  changePasswordFormSubmitted = false;

  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    private alertService: AlertService) {}

  ngOnInit() {
    this.accountService.getCurrentUser()
    .pipe(first())
      .subscribe((response) => {
        this.generalForm.controls.firstName.setValue(response.data.firstName);
        this.generalForm.controls.lastName.setValue(response.data.lastName);
        this.generalForm.controls.email.setValue(response.data.email);
        this.generalForm.controls.country.setValue(response.data.country);
      });
      this.generalForm = this.formBuilder.group({
        firstName: [null, [Validators.required,Validators.maxLength(50)]],
        lastName: [null, [Validators.required,Validators.maxLength(50)]],
        email: [null, [Validators.required, Validators.email,Validators.maxLength(50)]],
        country: [null, Validators.required],
      });
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(30)]],
      newPassword: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(30)]],
      confirmPassword: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(30)]],
    },
    { validators: this.checkPasswords });
  }
  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const pass = group.get('newPassword').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  };
    // convenience getter for easy access to form fields
    get getGeneralForm() { return this.generalForm.controls; }
    get getChangePasswordForm() { return this.changePasswordForm.controls; }

  onGeneralFormSubmit() {
    this.generalFormSubmitted = true;

    // stop here if form is invalid
    if (this.generalForm.invalid) {
      return;
    }
    this.loading = true;
    this.accountService.update(this.generalForm.value)
        .pipe(first())
        .subscribe(
            data => {
              if (data.hasError) 
                this.alertService.error(data.errorMessage);
              else
                this.alertService.success('Information successfully updated!', { keepAfterRouteChange: true });
                
              this.loading = false;
            },
            () => {
              this.loading = false;
              this.generalFormSubmitted = false;
              this.alertService.error('Something went wrong.');
            });
  }

  onChangePasswordFormSubmit() {
    this.changePasswordFormSubmitted = true;

    // stop here if form is invalid
    if (this.changePasswordForm.invalid || !this.changePasswordForm.dirty) {
      return;
    }
    this.loading = true;
    this.accountService.updatePassword(this.changePasswordForm.value)
        .pipe(first())
        .subscribe(
            data => {
              this.loading = false;
              if (data.hasError) {
                this.alertService.error(data.errorMessage);
              }
              else
                this.alertService.success('Password successfully changed!', { keepAfterRouteChange: true });
            },
            () => {
              this.loading = false;
              this.changePasswordFormSubmitted = false;
              this.alertService.error('Something went wrong.');
            });
  }
}
