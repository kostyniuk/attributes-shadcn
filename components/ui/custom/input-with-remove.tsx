"use client";

import { Trash2 } from "lucide-react";
import { Input } from "../input";

export const InputWithRemove = ({ id, value, onChange }: { id: string, value: string, onChange: (value: string) => void }) => {
  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className="flex items-center gap-2">
      <Input id={id} value={value} onChange={(e) => onChange(e.target.value)} />
        <Trash2 className="cursor-pointer size-4 text-red-500 hover:text-red-700" onClick={handleRemove}/>
    </div>  
  );
};