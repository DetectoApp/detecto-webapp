export interface ClinicalCaseExamType {
  id: number;
  name: string;
}

export interface BodyDistrict {
  id: number;
  label: string;
}

export interface InstrumentalExamType extends ClinicalCaseExamType {}

export interface LaboratoryExamType extends ClinicalCaseExamType {}

export interface ClinicalCaseExam {
  id: number;
  details: string;
  is_misleading: boolean;
  clinical_case: number;
  exam_type_id: number;
}

export interface ObjectiveExam extends ClinicalCaseExam {
  body_district: BodyDistrict;
}

export interface InstrumentalExam extends ClinicalCaseExam {
  instrumental_exam_type: InstrumentalExamType;
  media: string;
}

export interface LaboratoryExam extends ClinicalCaseExam {
  laboratory_exam_type: LaboratoryExamType;
  media: string;
}

export type OneOfExam = LaboratoryExam | InstrumentalExam | ObjectiveExam;
export type AllOfExam = LaboratoryExam & InstrumentalExam & ObjectiveExam;
