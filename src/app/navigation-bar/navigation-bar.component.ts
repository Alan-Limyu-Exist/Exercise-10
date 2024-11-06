import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from '../services/person.service';
import { RoleService } from '../services/role.service';
import { Person } from '../models/person.model';
import { Role } from '../models/role.model';
import { MatDialog } from '@angular/material/dialog';
import { AddPersonDialogComponent } from '../add-person-dialog/add-person-dialog.component';
import { AddRoleDialogComponent } from '../add-role-dialog/add-role-dialog.component';

@Component({
    selector: 'app-navigation-bar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
    people: Person[] = [];
    roles: Role[] = [];
    currentList: 'people' | 'roles' | null = null;

    constructor(
        private personService: PersonService,
        private roleService: RoleService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.showPeople();
    }

    showPeople(sortBy?: string): void {
        this.currentList = 'people';
        this.personService.getPeople(sortBy).subscribe(
            (data) => {
                this.people = data;
            },
            (error) => {
                console.error('Error fetching people', error);
            }
        );
    }

    showRoles(): void {
        this.currentList = 'roles';
        this.roleService.getRoles().subscribe(
            (data) => {
                this.roles = data;
            },
            (error) => {
                console.error('Error fetching roles', error);
            }
        );
    }

    sortPeople(column: string): void {
        this.showPeople(column);
    }

    openAddPersonDialog(): void {
      const dialogRef = this.dialog.open(AddPersonDialogComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.people.push(result);
        }
      });
    }

    openAddRoleDialog(): void {
        const dialogRef = this.dialog.open(AddRoleDialogComponent);
  
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.roles.push(result);
          }
        });
    }

    openEditPersonDialog(person: Person): void {
      const personClone = JSON.parse(JSON.stringify(person));
      const dialogRef = this.dialog.open(AddPersonDialogComponent, {
        data: personClone
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const index = this.people.findIndex(person => person.id === result.id);
          if (index !== -1) {
            this.people[index] = result;
          }
        }
      });
    }
    
    openEditRoleDialog(role: Role): void {
      const roleClone = JSON.parse(JSON.stringify(role));
      const dialogRef = this.dialog.open(AddRoleDialogComponent, {
        data: roleClone
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const index = this.roles.findIndex(role => role.id === result.id);
          if (index !== -1) {
            this.roles[index] = result;
          }
        }
      });
    }

    deletePerson(uuid: string): void {
        
    }

    deleteRole(uuid: string): void {
        
    }
}
