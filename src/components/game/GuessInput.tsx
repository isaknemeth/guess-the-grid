import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { CountryData } from "@/types/game";

interface GuessInputProps {
  countries: CountryData[];
  onGuess: (countryName: string) => void;
  disabled: boolean;
}

const GuessInput = ({ countries, onGuess, disabled }: GuessInputProps) => {
  const [open, setOpen] = useState(false);
  const [currentGuess, setCurrentGuess] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSelect = (value: string) => {
    setCurrentGuess(value);
    onGuess(value);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between"
        >
          {currentGuess
            ? countries.find((country) => country.name === currentGuess)?.name
            : "Select a country..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput 
            placeholder="Search country..." 
            value={searchValue}
            onValueChange={setSearchValue}
          />
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
                      currentGuess === country.name ? "opacity-100" : "opacity-0"
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