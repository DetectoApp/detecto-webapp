import { BodyDistrict } from './enums';

export interface ClinicalCaseExam {
  id: number;
  details: string;
  is_misleading: boolean;
  clinical_case: number;
}

export interface ObjectiveExam extends ClinicalCaseExam {
  body_district: BodyDistrict;
}

export interface InstrumentalExam extends ClinicalCaseExam {
  exam_name: string; //TODO
  media: string;
}

export interface LaboratoryExam extends ClinicalCaseExam {
  exam_name: string; //TODO
  media: string;
}

export type OneOfExam = LaboratoryExam | InstrumentalExam | ObjectiveExam;
export type AllOfExam = LaboratoryExam & InstrumentalExam & ObjectiveExam;
