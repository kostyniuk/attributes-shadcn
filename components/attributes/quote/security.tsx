import { TAB_DATA, ATTRIBUTE_TYPES } from "../constants";

export const Security = () => {
  const data = TAB_DATA[ATTRIBUTE_TYPES.QUOTE].security.data;

  return (
    <div className="mt-4 space-y-3 rounded-md border p-4">
      {data.map((item, index) => (
        <div key={index}>
          <p className="font-medium text-sm">{item.label}</p>
          <p className="text-muted-foreground text-sm">{item.value}</p>
        </div>
      ))}
    </div>
  );
};
