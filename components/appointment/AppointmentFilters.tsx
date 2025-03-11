// components/appointments/appointment-filters.tsx
"use client";

import { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock dentists data - would come from an API in a real application
const mockDentists = [
  { id: "den-001", name: "Dr. Robert Smith", specialty: "General Dentistry" },
  { id: "den-002", name: "Dr. Jennifer Lee", specialty: "Orthodontics" },
  { id: "den-003", name: "Dr. James Wilson", specialty: "Periodontics" },
  { id: "den-004", name: "Dr. Maria Garcia", specialty: "Endodontics" },
];

// Status options
const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "Scheduled", label: "Scheduled" },
  { value: "Confirmed", label: "Confirmed" },
  { value: "In Progress", label: "In Progress" },
  { value: "Completed", label: "Completed" },
  { value: "Canceled", label: "Canceled" },
  { value: "No-Show", label: "No-Show" },
];

// Date range options
const dateOptions = [
  { value: "all", label: "All Dates" },
  { value: "today", label: "Today" },
  { value: "tomorrow", label: "Tomorrow" },
  { value: "this-week", label: "This Week" },
  { value: "next-week", label: "Next Week" },
  { value: "this-month", label: "This Month" },
];

interface AppointmentFiltersProps {
  activeFilter: {
    status: string;
    dentist: string;
    date: string;
    search: string;
  };
  onFilterChange: (
    filter: Partial<{
      status: string;
      dentist: string;
      date: string;
      search: string;
    }>
  ) => void;
}

export default function AppointmentFilters({
  activeFilter,
  onFilterChange,
}: AppointmentFiltersProps) {
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState(activeFilter);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Count active filters (excluding 'all' which is the default)
  useEffect(() => {
    let count = 0;
    if (activeFilter.status !== "all") count++;
    if (activeFilter.dentist !== "all") count++;
    if (activeFilter.date !== "all") count++;
    if (activeFilter.search) count++;
    setActiveFiltersCount(count);
  }, [activeFilter]);

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Apply search filter
  const applySearch = () => {
    onFilterChange({ search });
  };

  // Handle enter key press in search field
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      applySearch();
    }
  };

  // Clear search field
  const clearSearch = () => {
    setSearch("");
    onFilterChange({ search: "" });
  };

  // Handle temp filter changes
  const handleTempFilterChange = (key: string, value: string) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Apply all filters
  const applyFilters = () => {
    onFilterChange(tempFilters);
    setIsFilterOpen(false);
  };

  // Clear all filters
  const clearFilters = () => {
    const resetFilters = {
      status: "all",
      dentist: "all",
      date: "all",
      search: "",
    };
    setTempFilters(resetFilters);
    setSearch("");
    onFilterChange(resetFilters);
    setIsFilterOpen(false);
  };

  // Reset temp filters when the popover opens
  useEffect(() => {
    if (isFilterOpen) {
      setTempFilters(activeFilter);
    }
  }, [isFilterOpen, activeFilter]);

  // Update search state when activeFilter.search changes
  useEffect(() => {
    setSearch(activeFilter.search);
  }, [activeFilter.search]);

  return (
    <div className="flex items-center gap-2">
      {/* Search Input */}
      <div className="relative w-full sm:w-[260px]">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search appointments..."
          className="pl-8 pr-10"
          value={search}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
        />
        {search && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-9 w-9 p-0"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filter Button */}
      <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "relative",
              activeFiltersCount > 0 ? "ring-2 ring-primary" : ""
            )}
            aria-label="Filter appointments"
          >
            <Filter className="h-4 w-4" />
            {activeFiltersCount > 0 && (
              <Badge
                className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center"
                variant="default"
              >
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[280px]">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Filters</h4>
              <p className="text-sm text-muted-foreground">
                Narrow down appointments by different criteria
              </p>
            </div>
            <Separator />

            {/* Status Filter */}
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-sm font-medium">Status</span>
              </div>
              <Select
                value={tempFilters.status}
                onValueChange={(value) =>
                  handleTempFilterChange("status", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Dentist Filter */}
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-sm font-medium">Dentist</span>
              </div>
              <Select
                value={tempFilters.dentist}
                onValueChange={(value) =>
                  handleTempFilterChange("dentist", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Dentists" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dentists</SelectItem>
                  {mockDentists.map((dentist) => (
                    <SelectItem key={dentist.id} value={dentist.id}>
                      {dentist.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Range Filter */}
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-sm font-medium">Date Range</span>
              </div>
              <Select
                value={tempFilters.date}
                onValueChange={(value) => handleTempFilterChange("date", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Dates" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {dateOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                disabled={
                  tempFilters.status === "all" &&
                  tempFilters.dentist === "all" &&
                  tempFilters.date === "all"
                }
              >
                Reset
              </Button>
              <Button size="sm" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
