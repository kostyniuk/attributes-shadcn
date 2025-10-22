import { TAB_DATA, PART_TABS, ATTRIBUTE_TYPES } from "../constants";

export const PaymentMethod = () => {
  const data = TAB_DATA[ATTRIBUTE_TYPES.PART].payment.data;
  
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
