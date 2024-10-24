import { Role } from "./role.model";

export interface Name {
    firstName: string;
    lastName: string;
    middleName?: string;
    suffix?: string;
    title?: string;
}

export interface Address {
    streetNo?: string;
    barangay?: string;
    municipality?: string;
    zipCode?: string;
}

export interface ContactInformation {
    landline?: string;
    mobileNumber?: string;
    email?: string;
}

export interface Person {
    id: number;
    uuid: string;
    name: Name;
    address: Address;
    gwa?: number;
    dateHired?: string;
    currentlyEmployed: boolean;
    contactInformation?: ContactInformation;
    roles?: Role[];
}
