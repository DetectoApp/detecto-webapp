import { UserProfile } from "./profile";

export enum Gender {
  'male' = 'M',
  'female' = 'F',
}

export enum Specialization {
  'OMEOPATIA' = 'OME',
  'MINCHIOLOGIA' = 'MIN',
}

export enum CaseStatus {
  'PARTUT' = 1,
  'APPROVAT' = 2,
  'CHEACUMBINAT' = 2,
}

export enum AvatarTypes {
  'ADOLESCENT' = '1',
  'ADULT' = '2',
  'STAGIONATO' = '3',
}

export interface Quiz {
  id: number;
  question: string;
  clinical_case: number;
}

export interface QuizAnswer {
  id: number;
  question: string;
  is_correct: boolean;
  quiz: number
}

export interface ClinicalCase {
  id: number;
  patient_name: string;
  age: number;
  gender: Gender;
  patient_weight: number;
  patient_height: number;
  brief_description: string;
  specialization: Specialization;
  case_status: CaseStatus;
  avatar: AvatarTypes;
  author: number;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export type UserRegistrationData =  UserLoginData & {
  data: Pick<UserProfile, "firstname" | "surname" | "role">
}

export type RegisterFormData = Omit<UserRegistrationData, "data"> & Omit<UserRegistrationData["data"], "role"> 

