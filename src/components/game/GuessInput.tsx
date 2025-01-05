import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { CountryData } from "@/types/game";
import { Input } from "@/components/ui/input";

interface GuessInputProps {
  countries: CountryData[];
  onGuess: (countryName: string) => void;
  disabled: boolean;
}

const GuessInput = ({ countries, onGuess, disabled }: GuessInputProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(value.toLowerCase())
  );

  const handleSelect = (currentValue: string) => {
    setValue(currentValue);
    setOpen(false);
    onGuess(currentValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for a country..."
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (!open) setOpen(true);
            }}
            onClick={() => setOpen(true)}
            disabled={disabled}
            className="w-full pr-10"
          />
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {filteredCountries.map((country) => (
                <CommandItem
                  key={country.name}
                  value={country.name}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === country.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {country.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default GuessInput;