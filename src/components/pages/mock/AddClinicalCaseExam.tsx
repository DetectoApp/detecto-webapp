import { ExamTypes } from '../../../types/enums';
import { AllOfExam } from '../../../types/examTypes';

type ClinicalCaseExamInput = AllOfExam & {
  examType: ExamTypes;
  answer: string;
};

export default 0; /*function AddClinicalCaseExam() {
  const [exam, setExam] = useState<Partial<ClinicalCaseExamInput>>({});
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();

    setLoading(true);

    let tableName = '';
    let examData:
      | Omit<ObjectiveExam, 'id'>
      | Omit<InstrumentalExam, 'id'>
      | Omit<LaboratoryExam, 'id'>
      | null = null;
    switch (exam.examType) {
      case ExamTypes.ObjectiveExam:
        tableName = 'objective_exam';
        examData = {
          details: exam.details!,
          is_misleading: exam.is_misleading!,
          clinical_case: exam.clinical_case!,
          body_district: exam.body_district!,
        };
        break;
      case ExamTypes.InstrumentalExam:
        tableName = 'instrumental_exam';
        examData = {
          details: exam.details!,
          is_misleading: exam.is_misleading ?? false,
          clinical_case: exam.clinical_case!,
          exam_name: exam.exam_name!,
          media: exam.media!,
        };
        break;
      case ExamTypes.LaboratoryExam:
        tableName = 'laboratory_exam';
        examData = {
          details: exam.details!,
          is_misleading: exam.is_misleading ?? false,
          clinical_case: exam.clinical_case!,
          exam_name: exam.exam_name!,
          media: exam.media!,
        };
        break;
    }

    const { data, error } = await supabase.from(tableName).insert([examData]);
    setLoading(false);

    toast({
      title: error?.message || 'Task added!',
      position: 'top',
      status: error ? 'error' : 'success',
      duration: 2000,
      isClosable: true,
    });
    if (!error) setExam({});
  };

  const [result, reexecute] = useRealtime<ClinicalCase>('clinical_case');
  const { data: clinicalCases, error, fetching } = result;

  if (fetching) {
    return (
      <Skeleton
        width={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
        height="300px"
        rounded="md"
      />
    );
  }

  if (!clinicalCases || !clinicalCases.length) {
    return (
      <Box alignItems="center">
        <Text variant="page_title" mt="30px">
          Nessun elemento appartenente alla selezione
        </Text>
      </Box>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack my="4" h="45">
        <Select
          placeholder="clinicalCase"
          onChange={e => {
            console.log(e);
            setExam(c => ({
              ...c,
              clinical_case: (e.target as any).selectedOptions[0].value,
            }));
          }}
        >
          {clinicalCases.map(c => (
            <option value={c.id}>{c.patient_name}</option>
          ))}
        </Select>
        <Select
          placeholder="examType"
          onChange={e => {
            console.log(e);
            setExam(c => ({
              ...c,
              examType: (e.target as any).selectedOptions[0].value as ExamTypes,
            }));
          }}
        >
          {(Object.keys(ExamTypes) as Array<keyof typeof ExamTypes>).map(
            key => (
              <option value={ExamTypes[key]}>{key}</option>
            )
          )}
        </Select>

        <CustomInput
          label="PLACEHOLDERLABEL"
          h="100%"
          placeholder="details"
          value={exam.details}
          onChange={e => setExam(c => ({ ...c, details: e.target.value }))}
          isDisabled={loading}
        />

        <Checkbox
          isChecked={exam.is_misleading}
          onChange={e =>
            setExam(c => ({ ...c, is_misleading: e.target.checked }))
          }
          isDisabled={loading}
        />

        {exam.examType === ExamTypes.ObjectiveExam ? (
          <>
            <Select
              placeholder="body_district"
              onChange={e => {
                console.log(e);
                setExam(c => ({
                  ...c,
                  body_district: (e.target as any).selectedOptions[0]
                    .value as BodyDistrict,
                }));
              }}
            >
              {(
                Object.keys(BodyDistrict) as Array<keyof typeof BodyDistrict>
              ).map(key => (
                <option value={BodyDistrict[key]}>{key}</option>
              ))}
            </Select>
          </>
        ) : exam.examType === ExamTypes.InstrumentalExam ? (
          <>
            <Select
              placeholder="exam_name"
              onChange={e => {
                console.log(e);
                setExam(c => ({
                  ...c,
                  exam_name: (e.target as any).selectedOptions[0]
                    .value as InstrumentalExamName,
                }));
              }}
            >
              {(
                Object.keys(InstrumentalExamName) as Array<
                  keyof typeof InstrumentalExamName
                >
              ).map(key => (
                <option value={InstrumentalExamName[key]}>{key}</option>
              ))}
            </Select>
            <CustomInput
              label="PLACEHOLDERLABEL"
              h="100%"
              placeholder="media"
              value={exam.media}
              onChange={e => setExam(c => ({ ...c, media: e.target.value }))}
              isDisabled={loading}
            />
          </>
        ) : (
          <>
            <Select
              placeholder="exam_name"
              onChange={e => {
                console.log(e);
                setExam(c => ({
                  ...c,
                  exam_name: (e.target as any).selectedOptions[0]
                    .value as LaboratoryExamName,
                }));
              }}
            >
              {(
                Object.keys(LaboratoryExamName) as Array<
                  keyof typeof LaboratoryExamName
                >
              ).map(key => (
                <option value={LaboratoryExamName[key]}>{key}</option>
              ))}
            </Select>
            <CustomInput
              label="PLACEHOLDERLABEL"
              h="100%"
              placeholder="media"
              value={exam.media}
              onChange={e => setExam(c => ({ ...c, media: e.target.value }))}
              isDisabled={loading}
            />
          </>
        )}

        <Button
          colorScheme="blue"
          px="10"
          h="100%"
          type="submit"
          isLoading={loading}
          loadingText="Adding"
        >
          Add
        </Button>
      </VStack>
    </form>
  );
}
*/
