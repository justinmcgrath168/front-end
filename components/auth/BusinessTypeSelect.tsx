// src/components/auth/BusinessTypeSelect.tsx

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BusinessTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function BusinessTypeSelect({
  value,
  onChange,
}: BusinessTypeSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select business type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="clinic">Dental Clinic</SelectItem>
        <SelectItem value="lab">Dental Lab</SelectItem>
        <SelectItem value="imaging">Imaging Center</SelectItem>
        <SelectItem value="supplies">Dental Supplier</SelectItem>
      </SelectContent>
    </Select>
  );
}
