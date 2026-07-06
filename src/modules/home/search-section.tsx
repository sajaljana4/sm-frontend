import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  LANGUAGE_OPTIONS,
  RELIGION_OPTIONS,
  CASTE_OPTIONS,
} from "@/constants/user.constants";

function PartnerSearchSection() {
  return (
    <div className="base-section mx-auto">
      <div className="bg-linear-to-r from-[#903d57]/50 to-[#731c3c]/50 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/10">
        <div className="flex flex-col md:flex-row items-end gap-4 w-full">
          {/* Age Group */}
          <div className="flex flex-col gap-2 flex-1">
            <Label className="text-white font-medium text-sm">Age</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="From"
                className="bg-white text-black border-0 focus-visible:ring-1 focus-visible:ring-white/50 h-11"
              />
              <Input
                type="number"
                placeholder="To"
                className="bg-white text-black border-0 focus-visible:ring-1 focus-visible:ring-white/50 h-11"
              />
            </div>
          </div>

          {/* Mother Tongue */}
          <div className="flex flex-col gap-2 flex-1">
            <Label className="text-white font-medium text-sm">
              Mother Tongue
            </Label>
            <Select>
                 <SelectTrigger className="bg-white text-black border-0 focus:ring-1 focus:ring-white/50 py-5.5 w-full">
                <SelectValue placeholder="Please Select" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Religion */}
          <div className="flex flex-col gap-2 flex-1">
            <Label className="text-white font-medium text-sm">Religion</Label>
            <Select>
              <SelectTrigger className="bg-white text-black border-0 focus:ring-1 focus:ring-white/50 py-5.5 w-full">
                <SelectValue placeholder="Please Select" />
              </SelectTrigger>
              <SelectContent>
                {RELIGION_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Caste */}
          <div className="flex flex-col gap-2 flex-1">
            <Label className="text-white font-medium text-sm">Caste</Label>
            <Select>
              <SelectTrigger className="bg-white text-black border-0 focus:ring-1 focus:ring-white/50 py-5.5 w-full">
                <SelectValue placeholder="Please Select" />
              </SelectTrigger>
              <SelectContent>
                {CASTE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <div className="flex-1">
            <Button className="bg-[#E93375] hover:bg-[#d42761] text-white font-semibold h-11 px-8 rounded-md transition-colors w-full">
              SUBMIT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartnerSearchSection;
