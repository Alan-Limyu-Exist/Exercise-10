import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Person } from '../models/person.model';
import { PersonService } from '../services/person.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-person-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-person-dialog.component.html',
  styleUrls: ['./add-person-dialog.component.css']
})
export class AddPersonDialogComponent {
  newPerson: Person = {
    id: 0,
    uuid: '',
    name: {
      firstName: '',
      lastName: '',
      middleName: '',
      suffix: '',
      title: ''
    },
    address: {
      streetNo: '',
      barangay: '',
      municipality: '',
      zipCode: ''
    },
    currentlyEmployed: false
  };

  constructor(
    private dialogRef: MatDialogRef<AddPersonDialogComponent>,
    private personService: PersonService
  ) {}

  addPerson(): void {
    this.personService.createPerson(this.newPerson).subscribe(
      (response) => {
        this.dialogRef.close(response);
      },
      (error) => {
        console.error('Error adding person', error);
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
