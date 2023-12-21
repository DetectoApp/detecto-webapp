import supabase from '../supabase';
import { ExamTypes, TalkTypes } from '../types/enums';
import { capitalizeFirstLetter } from '../intl';
import { QueryData } from '@supabase/supabase-js';

export const getClinicalCasesQuery = () =>
  supabase
    .from('clinical_case')
    .select(`*, case_details(*, specialization(*))`);

export const getClinicalCaseQuery = (id: string) =>
  supabase
    .from('clinical_case')
    .select(`*, case_details(*, specialization(*))`)
    .eq('id', id)
    .single();

const getPreviousVisitQuery = (clinicalCaseId: string) =>
  supabase
    .from('previous_visit')
    .select('*, specialist(*)')
    .eq('clinical_case', clinicalCaseId);

const getSymptomQuery = (clinicalCaseId: string) =>
  supabase
    .from('symptom')
    .select('*, body_symptom(*)')
    .eq('clinical_case', clinicalCaseId);

const getRelationshipQuery = (clinicalCaseId: string) =>
  supabase
    .from('relationship')
    .select('*, family_member_grade(*), health_state(*)')
    .eq('clinical_case', clinicalCaseId);

const getInstrumentalExamQuery = (clinicalCaseId: string) =>
  supabase
    .from('instrumental_exam')
    .select(`*, instrumental_exam_type(*)`)
    .eq('clinical_case', clinicalCaseId);

const getLaboratoryExamQuery = (clinicalCaseId: string) =>
  supabase
    .from('laboratory_exam')
    .select(`*, laboratory_exam_type(*)`)
    .eq('clinical_case', clinicalCaseId);

const getObjectiveExamQuery = (clinicalCaseId: string) =>
  supabase
    .from('objective_exam')
    .select(`*, body_district(*)`)
    .eq('clinical_case', clinicalCaseId);

const getDiagnosisQuestionsQuery = (clinicalCaseId: string) =>
  supabase
    .from('diagnosisquestion')
    .select('*')
    .eq('clinical_case', clinicalCaseId);

export type ClinicalCaseDataType = QueryData<
  ReturnType<typeof getClinicalCaseQuery>
>;

export type PreviousVisitDataType = QueryData<
  ReturnType<typeof getPreviousVisitQuery>
>[number];

export type RelationshipDataType = QueryData<
  ReturnType<typeof getRelationshipQuery>
>[number];

export type SymptomDataType = QueryData<
  ReturnType<typeof getSymptomQuery>
>[number];

export type InstrumentalExamDataType = QueryData<
  ReturnType<typeof getInstrumentalExamQuery>
>[number];

export type LaboratoryExamDataType = QueryData<
  ReturnType<typeof getLaboratoryExamQuery>
>[number];

export type ObjectiveExamDataType = QueryData<
  ReturnType<typeof getObjectiveExamQuery>
>[number];

export type DiagnosisQuestionDataType = QueryData<
  ReturnType<typeof getDiagnosisQuestionsQuery>
>[number];

export type OneOfExamDataType =
  | LaboratoryExamDataType
  | InstrumentalExamDataType
  | ObjectiveExamDataType;
export type AllOfExamDataType = LaboratoryExamDataType &
  InstrumentalExamDataType &
  ObjectiveExamDataType;

export type OneOfTalkDataType =
  | RelationshipDataType
  | PreviousVisitDataType
  | SymptomDataType;
export type AllOfTalkDataType = RelationshipDataType &
  PreviousVisitDataType &
  SymptomDataType;

export const fetchCases = async () => {
  const { data, error } = await getClinicalCasesQuery();
  if (error) {
    console.log(error);
    return null;
  } else {
    return data;
  }
};

export const fetchCase = async (id: string) => {
  const { data, error } = await getClinicalCaseQuery(id);
  if (error) {
    console.log(error);
    return null;
  } else {
    return data;
  }
};

export const fetchTalks = async (clinicalCaseId: string) => {
  const talks: (OneOfTalkDataType & {
    type: TalkTypes;
    answer: string;
    title: string;
  })[] = [];
  const { data: previousVisit, error: previousVisitError } =
    await getPreviousVisitQuery(clinicalCaseId);

  if (previousVisitError) {
    console.log(previousVisitError);
  } else
    talks.push(
      ...previousVisit.map(e => ({
        ...e,
        type: TalkTypes.PreviousVisit,
        title: e.specialist?.name ?? 'ERROR',
        answer: e.diagnosis_reason ?? 'ERROR',
      }))
    );

  const { data: relationship, error: relationshipError } =
    await getRelationshipQuery(clinicalCaseId);

  if (relationshipError) {
    console.log(relationshipError);
  } else
    talks.push(
      ...relationship.map(e => ({
        ...e,
        type: TalkTypes.Relationship,
        title:
          capitalizeFirstLetter(e.family_member_grade?.name ?? 'ERROR') +
            ' ' +
            e.health_state?.name ?? 'ERROR',
        answer: e.details,
      }))
    );

  const { data: symptom, error: symptomError } = await getSymptomQuery(
    clinicalCaseId
  );

  if (symptomError) {
    console.log(symptomError);
  } else
    talks.push(
      ...symptom.map(e => ({
        ...e,
        type: TalkTypes.Symptom,
        title: e.body_symptom?.name ?? 'ERROR',
        answer: e.symptom_details ?? 'ERROR',
      }))
    );

  return talks;
};

export const fetchExams = async (clinicalCaseId: string) => {
  const exams: (OneOfExamDataType & {
    type: ExamTypes;
    answer: string;
    title: string;
  })[] = [];
  const { data: instrumentalExam, error: instrumentalExamError } =
    await getInstrumentalExamQuery(clinicalCaseId);
  if (instrumentalExamError) {
    console.log(instrumentalExamError);
  } else
    exams.push(
      ...instrumentalExam.map(e => ({
        ...e,
        type: ExamTypes.InstrumentalExam,
        title: e.instrumental_exam_type?.name ?? 'ERROR',
        answer: e.details,
      }))
    );

  const { data: laboratoryExam, error: laboratoryExamError } =
    await getLaboratoryExamQuery(clinicalCaseId);

  if (laboratoryExamError) {
    console.log(laboratoryExamError);
  } else
    exams.push(
      ...laboratoryExam.map(e => ({
        ...e,
        type: ExamTypes.LaboratoryExam,
        title: e.laboratory_exam_type?.name ?? 'ERROR',
        answer: e.details,
      }))
    );

  const { data: objectiveExam, error: objectiveExamError } =
    await getObjectiveExamQuery(clinicalCaseId);

  if (objectiveExamError) {
    console.log(objectiveExamError);
  } else
    exams.push(
      ...objectiveExam.map(e => ({
        ...e,
        type: ExamTypes.ObjectiveExam,
        title: e.body_district?.label ?? 'ERROR',
        answer: e.details,
      }))
    );

  return exams;
};

export const fetchDiagnosisQuestions = async (clinicalCaseId: string) => {
  const diagnosisQuestions = [];

  const { data, error } = await getDiagnosisQuestionsQuery(clinicalCaseId);

  if (error) {
    console.log(error);
    return null;
  }

  for (const q of data) {
    const { data: answers, error } = await supabase
      .from('diagnosisquestion_answer')
      .select('*')
      .eq('diagnosisquestion', q.id);

    if (error) {
      console.log(error);
    } else {
      diagnosisQuestions.push({ ...q, answers });
    }
  }

  return diagnosisQuestions;
};
