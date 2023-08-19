import { ExamTypes } from '@/types/enums';
import { create } from 'zustand';

export type ExamStatus = 'IGNORED' | 'OPENED';
export type TalkStatus = 'IGNORED' | 'OPENED';

interface CaseExplorationStoreType {
  examStatuses: { [examId: string]: ExamStatus };
  talkStatuses: { [talkId: string]: TalkStatus };
  getExamStatus: (examId: string) => ExamStatus;
  getTalkStatus: (talkId: string) => TalkStatus;
  setExamStatus: (examId: string, examStatus: ExamStatus) => void;
  setTalkStatus: (talkId: string, talkStatus: TalkStatus) => void;
}

export const useCaseExplorationStore = create<CaseExplorationStoreType>(set => {
  const store: CaseExplorationStoreType = {
    examStatuses: {},
    talkStatuses: {},
    getExamStatus: examId => store.examStatuses[examId],
    getTalkStatus: talkId => store.talkStatuses[talkId],
    setExamStatus: (examId, examStatus) =>
      set(s => ({ examStatuses: { ...s.examStatuses, [examId]: examStatus } })),
    setTalkStatus: (talkId, talkStatus) =>
      set(s => ({ talkStatuses: { ...s.talkStatuses, [talkId]: talkStatus } })),
  };
  return store;
});
