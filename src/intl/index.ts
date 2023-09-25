const italian: { [key: string]: string } = {
  examQuestion:
    'Vuoi effettuare l’esame? Se si premi prescrivi.\n\nRicorda che gli esami possono essere anche svianti e non correlati al caso.',
  ignoredExam: 'Hai ignorato l’esame.',
  talkQuestion:
    'Chiedi al paziente le informazioni giuste che possono aiutarti a risolvere il suo problema',
  ignoredTalk: 'Hai deciso di ignorare questa domanda',
};

export const getString = (key: string) => italian[key];
