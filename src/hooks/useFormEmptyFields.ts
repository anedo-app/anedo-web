import {useMemo, useState} from "react";

const useFormEmptyFields = (fields: {[key: string]: unknown}) => {
  const [showEmptyFields, setShowEmptyFields] = useState(false);

  const isFieldEmpty = (field: string) =>
    showEmptyFields && emptyFields.includes(field);

  const emptyFields = useMemo(
    () => Object.keys(fields).filter((e) => !fields[e]),
    [fields],
  );

  const hasEmptyFields = useMemo(() => emptyFields.length > 0, [emptyFields]);

  return {
    isFieldEmpty,
    emptyFields,
    hasEmptyFields,
    setShowEmptyFields,
    showEmptyFields,
  };
};

export default useFormEmptyFields;
