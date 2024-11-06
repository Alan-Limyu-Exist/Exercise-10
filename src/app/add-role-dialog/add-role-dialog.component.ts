import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Role } from '../models/role.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-add-role-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-role-dialog.component.html',
  styleUrls: ['./add-role-dialog.component.css']
})
export class AddRoleDialogComponent {
  newRole: Role = {
    id: 0,
    uuid: '',
    name: ''
  };

  constructor(
    private dialogRef: MatDialogRef<AddRoleDialogComponent>,
    private roleService: RoleService
  ) {}

  addRole(): void {
    this.roleService.createRole(this.newRole).subscribe(
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
