import { create } from 'zustand';

export type ExamStatus = { status: 'IGNORED' | 'OPENED'; id: number };
export type TalkStatus = { status: 'IGNORED' | 'OPENED'; id: number };

interface CaseExplorationStoreType {
  examStatuses: { [examId: string]: ExamStatus };
  talkStatuses: { [talkId: string]: TalkStatus };
  diagnosisquestionAnswers: {
    [diagnosisquestionId: string]: any;
  };
  getExamStatus: (examId: string) => ExamStatus;
  getTalkStatus: (talkId: string) => TalkStatus;
  getDiagnosisQuestionAnswer: (diagnosisquestionId: string) => any;
  setExamStatus: (examId: string, examStatus: ExamStatus) => void;
  setTalkStatus: (talkId: string, talkStatus: TalkStatus) => void;
  setDiagnosisQuestionAnswer: (
    diagnosisquestionId: string,
    diagnosisquestionAnswer: any
  ) => void;
}

export const useCaseExplorationStore = create<CaseExplorationStoreType>(set => {
  const store: CaseExplorationStoreType = {
    examStatuses: {},
    talkStatuses: {},
    diagnosisquestionAnswers: {},
    getExamStatus: examId => store.examStatuses[examId],
    getTalkStatus: talkId => store.talkStatuses[talkId],
    getDiagnosisQuestionAnswer: diagnosisquestionId =>
      store.diagnosisquestionAnswers[diagnosisquestionId],
    setExamStatus: (examId, examStatus) =>
      set(s => ({ examStatuses: { ...s.examStatuses, [examId]: examStatus } })),
    setTalkStatus: (talkId, talkStatus) =>
      set(s => ({ talkStatuses: { ...s.talkStatuses, [talkId]: talkStatus } })),
    setDiagnosisQuestionAnswer: (
      diagnosisquestionId,
      diagnosisquestionAnswer
    ) =>
      set(s => ({
        diagnosisquestionAnswers: {
          ...s.diagnosisquestionAnswers,
          [diagnosisquestionId]: diagnosisquestionAnswer,
        },
      })),
  };
  return store;
});
