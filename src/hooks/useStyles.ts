interface UseStylesReturn {
  s: (c: Classlist) => string;
}

interface ConditionalClass {
  [key: string]: boolean | undefined;
}
type Classlist = (string | undefined | ConditionalClass)[];

const formatClassObject = (classes: ConditionalClass) => {
  return Object.keys(classes)
    .filter((key) => classes[key])
    .join(" ");
};

const useStyles = (): UseStylesReturn => {
  const s = (classes: Classlist): string => {
    return classes
      .map((c) => {
        if (c === undefined) return "";
        if (typeof c === "string") return c;
        return formatClassObject(c);
      })
      .join(" ");
  };
  return {s};
};

export default useStyles;
