export const contactStatus = {
  OK: 'OK',
  INVALID: 'INVALID',
  DO_NOT_CALL: 'DO_NOT_CALL',
  DO_NOT_EMAIL: 'DO_NOT_EMAIL',
  DO_NOT_CONTACT: 'DO_NOT_CONTACT',
};
export type ContactStatus = (typeof contactStatus)[keyof typeof contactStatus];

export const emailStatus = {
  OK: 'OK',
  BOUNCED: 'BOUNCED',
  VERIFIED: 'VERIFIED',
};
export type EmailStatus = (typeof emailStatus)[keyof typeof emailStatus];

export const phoneStatus = {
  OK: 'OK',
  INVALID: 'INVALID',
  VERIFIED: 'VERIFIED',
};
export type PhoneStatus = (typeof phoneStatus)[keyof typeof phoneStatus];

export const gender = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER',
  UNKNOWN: 'UNKNOWN'
};
export type Gender = (typeof gender)[keyof typeof gender];

export const contactType = {
  PERSON: 'PERSON',
  COMPANY: 'COMPANY',
};
export type ContactType = (typeof contactType)[keyof typeof contactType];


interface Media {
  primary: boolean;
  type: string;
  email: string;
}

export interface Email extends Media {
  email: string;
  status: EmailStatus;
}

export interface Phone extends Media {
  number: string;
  status: PhoneStatus;
}

export interface Contact {
  id: string;
  contactType: ContactType;
  displayName: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  phoneNumbers: Phone[];
  emails: Email[];
  updated: number;
  status: ContactStatus;
}
