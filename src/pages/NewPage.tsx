import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format, subDays } from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { LoadingScreen } from "../components/LoadingScreen";
import { SoftwareCard } from "../components/SoftwareCard";
import { useSoftwareData } from "../hooks/useSoftwareData";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import "react-day-picker/dist/style.css";

const NoNewSoftware = () => (
  <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-xl shadow-sm border">
    <h2 className="text-2xl font-semibold text-foreground">
      No Software Found
    </h2>
    <p className="mt-2 text-foreground/60">
      Try selecting a different date to see more software.
    </p>
  </div>
);

export function NewPage() {
  const { loading, software } = useSoftwareData();
  const [selectedDate, setSelectedDate] = useState<Date>(
    subDays(new Date(), 7)
  ); // Default to 1 week ago

  if (loading) {
    return <LoadingScreen />;
  }

  const filteredSoftware = software.filter((item) => {
    if (!selectedDate || !item.lastUpdated) return false;
    const itemDate = new Date(item.lastUpdated);
    return itemDate >= selectedDate;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              New Software
            </h1>
            <p className="text-sm text-foreground/60 mt-1">
              Found {filteredSoftware.length} items since selected date
            </p>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[280px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-auto p-0">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(date) =>
                  setSelectedDate(date || subDays(new Date(), 7))
                }
                initialFocus
                className="p-3"
                classNames={{
                  months:
                    "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption:
                    "flex justify-center pt-1 relative items-center px-10",
                  caption_label: "text-sm font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button:
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell:
                    "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem] dark:text-gray-400",
                  row: "flex w-full mt-2",
                  cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent dark:[&:has([aria-selected])]:bg-gray-800",
                  day: "h-8 w-8 p-0 font-normal",
                  day_range_end: "day-range-end",
                  day_selected:
                    "rounded-lg bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground dark:bg-blue-600 dark:text-white",
                  day_today:
                    "rounded-lg bg-accent text-accent-foreground dark:bg-gray-800 dark:text-gray-100",
                  day_outside:
                    "text-muted-foreground opacity-50 dark:text-gray-500",
                  day_disabled:
                    "text-muted-foreground opacity-50 dark:text-gray-600",
                  day_range_middle:
                    "aria-selected:bg-accent aria-selected:text-accent-foreground dark:aria-selected:bg-gray-800 dark:aria-selected:text-gray-100",
                  day_hidden: "invisible",
                }}
                components={{
                  IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                  IconRight: () => <ChevronRight className="h-4 w-4" />,
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {selectedDate && (
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Showing software created since{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              {format(selectedDate, "MMMM d, yyyy")}
            </span>
          </div>
        )}

        {filteredSoftware.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredSoftware.map((item) => (
              <SoftwareCard key={item.id} software={item} />
            ))}
          </div>
        ) : (
          <NoNewSoftware />
        )}
      </div>
    </main>
  );
}
