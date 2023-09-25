import { QuizAnswer } from '@/types/types';
import { create } from 'zustand';

export type ExamStatus = { status: 'IGNORED' | 'OPENED'; id: number };
export type TalkStatus = { status: 'IGNORED' | 'OPENED'; id: number };

interface CaseExplorationStoreType {
  examStatuses: { [examId: string]: ExamStatus };
  talkStatuses: { [talkId: string]: TalkStatus };
  quizAnswers: { [quizId: string]: QuizAnswer };
  getExamStatus: (examId: string) => ExamStatus;
  getTalkStatus: (talkId: string) => TalkStatus;
  getQuizAnswer: (quizId: string) => QuizAnswer;
  setExamStatus: (examId: string, examStatus: ExamStatus) => void;
  setTalkStatus: (talkId: string, talkStatus: TalkStatus) => void;
  setQuizAnswer: (quizId: string, quizAnswer: QuizAnswer) => void;
}

export const useCaseExplorationStore = create<CaseExplorationStoreType>(set => {
  const store: CaseExplorationStoreType = {
    examStatuses: {},
    talkStatuses: {},
    quizAnswers: {},
    getExamStatus: examId => store.examStatuses[examId],
    getTalkStatus: talkId => store.talkStatuses[talkId],
    getQuizAnswer: quizId => store.quizAnswers[quizId],
    setExamStatus: (examId, examStatus) =>
      set(s => ({ examStatuses: { ...s.examStatuses, [examId]: examStatus } })),
    setTalkStatus: (talkId, talkStatus) =>
      set(s => ({ talkStatuses: { ...s.talkStatuses, [talkId]: talkStatus } })),
    setQuizAnswer: (quizId, quizAnswer) =>
      set(s => ({ quizAnswers: { ...s.quizAnswers, [quizId]: quizAnswer } })),
  };
  return store;
});
