import { BodyDistrict, SpecialistType } from './enums';

export enum TalkTypes {
  'PreviousVisit' = '1',
  'Relationship' = '2',
  'Symptom' = '3',
}

export interface ClinicalCaseTalk {
  id: number;
  is_misleading: boolean;
  clinical_case: number;
}

export interface PreviousVisit extends ClinicalCaseTalk {
  specialist_type: SpecialistType;
  diagnosis_short: string;
  diagnosis_reason: string;
}

export interface Relationship extends ClinicalCaseTalk {
  family_member_grade: string;
  health_state: string;
  details: string;
}

export interface Symptom extends ClinicalCaseTalk {
  body_district: BodyDistrict;
  symptom: string;
  symptom_details: string;
  media: string;
}

export type OneOfTalk = Relationship | PreviousVisit | Symptom;
export type AllOfTalk = Relationship & PreviousVisit & Symptom;
