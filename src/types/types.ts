export enum Gender {
  'male' = 'M',
  'female' = 'F',
}

export enum Specialization {
  'OMEOPATIA' = 'OME',
  'MINCHIOLOGIA' = 'MIN',
}

export enum CaseStatus {
  'DRAFT' = 0,
  'SAVED' = 1,
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
  text: string;
  is_correct: boolean;
  quiz: number;
}

export interface ClinicalCaseSpecialization {
  id: number;
  name: string;
}

export interface ClinicalCaseDetails {
  id: number;
  specialization_id: number;
  difficulty: number;
  solution: string;
  specialization: ClinicalCaseSpecialization;
}

export interface ClinicalCase {
  id: number;
  patient_name: string;
  age: number;
  gender: Gender;
  patient_weight: number;
  patient_height: number;
  brief_description: string;
  case_status: CaseStatus;
  avatar: AvatarTypes;
  author: number;
  case_details?: ClinicalCaseDetails;
}

export interface UserProfile {
  id: string;
  firstname: string;
  surname: string;
  role: 'DOCTOR' | 'STUDENT';
  user_id: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export type UserRegistrationData = UserLoginData & {
  data: Omit<UserProfile, 'email' | 'password' | 'id' | 'user_id'>;
};

export type RegisterFormData = Omit<UserRegistrationData, 'data'> &
  Omit<UserRegistrationData['data'], 'role'>;

export interface SelectOption {
  id: number;
  label: string;
}
