import { Quiz, QuizAnswer } from '@/types/types';
import supabase from '../supabase';
import { ExamTypes, TalkTypes } from '../types/enums';
import {
  OneOfExam,
  InstrumentalExam,
  LaboratoryExam,
  ObjectiveExam,
} from '../types/examTypes';
import {
  OneOfTalk,
  PreviousVisit,
  Relationship,
  Symptom,
} from '../types/talkTypes';
import { capitalizeFirstLetter } from '../intl';

export const fetchCase = async (id: string) => {
  const { data, error } = await supabase
    .from('clinical_case')
    .select(
      `*, case_details:case_details_id(*, specialization:specialization_id(*))`
    )
    .eq('id', id)
    .single();

  if (error) {
    console.log(error);
  } else {
    return data;
  }
};

export const fetchTalks = async (clinicalCaseId: string) => {
  const talks: (OneOfTalk & {
    type: TalkTypes;
    answer: string;
    title: string;
  })[] = [];

  const { data: previousVisit, error: previousVisitError } = await supabase
    .from<PreviousVisit>('previous_visit')
    .select('*, specialist: specialist_id(*)')
    .eq('clinical_case', clinicalCaseId);

  if (previousVisitError) {
    console.log(previousVisitError);
  } else
    talks.push(
      ...previousVisit.map(e => ({
        ...e,
        type: TalkTypes.PreviousVisit,
        title: e.specialist.name,
        answer: e.diagnosis_reason,
      }))
    );

  const { data: relationship, error: relationshipError } = await supabase
    .from<Relationship>('relationship')
    .select(
      '*, family_member_grade:family_member_grade_id(*), health_state:health_state(*)'
    )
    .eq('clinical_case', clinicalCaseId);

  if (relationshipError) {
    console.log(relationshipError);
  } else
    talks.push(
      ...relationship.map(e => ({
        ...e,
        type: TalkTypes.Relationship,
        title:
          capitalizeFirstLetter(e.family_member_grade.name) +
          ' ' +
          e.health_state.name,
        answer: e.details,
      }))
    );

  const { data: symptom, error: symptomError } = await supabase
    .from<Symptom>('symptom')
    .select('*, body_symptom:body_symptom_id(*)')
    .eq('clinical_case', clinicalCaseId);

  if (symptomError) {
    console.log(symptomError);
  } else
    talks.push(
      ...symptom.map(e => ({
        ...e,
        type: TalkTypes.Symptom,
        title: e.body_symptom.name,
        answer: e.symptom_details,
      }))
    );

  return talks;
};

export const fetchExams = async (clinicalCaseId: string) => {
  const exams: (OneOfExam & {
    type: ExamTypes;
    answer: string;
    title: string;
  })[] = [];

  const { data: instrumentalExam, error: instrumentalExamError } =
    await supabase
      .from<InstrumentalExam>('instrumental_exam')
      .select(`*, instrumental_exam_type:exam_type_id(*)`)
      .eq('clinical_case', clinicalCaseId);

  if (instrumentalExamError) {
    console.log(instrumentalExamError);
  } else
    exams.push(
      ...instrumentalExam.map(e => ({
        ...e,
        type: ExamTypes.InstrumentalExam,
        title: e.instrumental_exam_type.name,
        answer: e.details,
      }))
    );

  const { data: laboratoryExam, error: laboratoryExamError } = await supabase
    .from<LaboratoryExam>('laboratory_exam')
    .select(`*, laboratory_exam_type:exam_type_id(*)`)
    .eq('clinical_case', clinicalCaseId);

  if (laboratoryExamError) {
    console.log(laboratoryExamError);
  } else
    exams.push(
      ...laboratoryExam.map(e => ({
        ...e,
        type: ExamTypes.LaboratoryExam,
        title: e.laboratory_exam_type.name,
        answer: e.details,
      }))
    );

  const { data: objectiveExam, error: objectiveExamError } = await supabase
    .from<ObjectiveExam>('objective_exam')
    .select(`*, body_district:body_district(*))`)
    .eq('clinical_case', clinicalCaseId);

  if (objectiveExamError) {
    console.log(objectiveExamError);
  } else
    exams.push(
      ...objectiveExam.map(e => ({
        ...e,
        type: ExamTypes.ObjectiveExam,
        title: e.body_district.label,
        answer: e.details,
      }))
    );

  return exams;
};

export const fetchQuizzes = async (clinicalCaseId: string) => {
  const quizzes: (Quiz & { answers: QuizAnswer[] })[] = [];

  const { data, error } = await supabase
    .from<Quiz>('quiz')
    .select('*')
    .eq('clinical_case', clinicalCaseId);

  if (error) {
    console.log(error);
    return quizzes;
  }

  for (const q of data) {
    const { data: answers, error } = await supabase
      .from<QuizAnswer>('quiz_answer')
      .select('*')
      .eq('quiz', q.id);

    if (error) {
      console.log(error);
    } else {
      quizzes.push({ ...q, answers });
    }
  }

  return quizzes;
};
