import { BodyDistrict } from './examTypes';

export enum TalkTypes {
  'PreviousVisit' = '1',
  'Relationship' = '2',
  'Symptom' = '3',
  'Behaviour' = '4',
}

export interface BodySymptom {
  id: number;
  name: string;
  body_district: BodyDistrict;
}

export interface FamilyMemberGrade {
  id: number;
  name: string;
}

export interface HealthState {
  id: number;
  name: string;
}

export interface Specialist {
  id: number;
  name: string;
}

export interface ClinicalCaseTalk {
  id: number;
  is_misleading: boolean;
  clinical_case: number;
}

export interface PreviousVisit extends ClinicalCaseTalk {
  specialist: Specialist;
  diagnosis_short: string;
  diagnosis_reason: string;
}

export interface Relationship extends ClinicalCaseTalk {
  family_member_grade: FamilyMemberGrade;
  health_state: HealthState;
  details: string;
}

export interface Symptom extends ClinicalCaseTalk {
  body_symptom: BodySymptom;
  symptom: string;
  symptom_details: string;
  media: string;
}

export type OneOfTalk = Relationship | PreviousVisit | Symptom;
export type AllOfTalk = Relationship & PreviousVisit & Symptom;
