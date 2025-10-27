"use client";
import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// 🟢 Définition des props
interface DateRangePickerProps {
  onDateChange?: (range: DateRange | undefined) => void;
}

export function DatePicker({ onDateChange }: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  // 🔴 N'appeler onDateChange QUE lorsque l'utilisateur sélectionne activement des dates
  const handleSelect = (range: DateRange | undefined) => {
    setDate(range);
    if (onDateChange) onDateChange(range);
  };

  return (
    <div className="flex flex-row items-center gap-3">
      <Label htmlFor="date" className="px-1">
        Date
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-64 justify-between py-5 font-normal"
          >
            {date?.from && date?.to ? (
              <>
                {date.from.toLocaleDateString()} →{" "}
                {date.to.toLocaleDateString()}
              </>
            ) : (
              "Choisir une plage de dates"
            )}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}