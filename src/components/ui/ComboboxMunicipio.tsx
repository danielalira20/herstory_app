import { useState } from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { getMunicipiosPorEstado } from "@/data/municipios-mexico"
import { cn } from "@/lib/utils"

interface ComboboxMunicipioProps {
  estado: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

const ComboboxMunicipio = ({
  estado,
  value,
  onChange,
  placeholder = "Selecciona un municipio",
  disabled = false,
}: ComboboxMunicipioProps) => {
  const [open, setOpen] = useState(false)
  const municipios = getMunicipiosPorEstado(estado)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled || !estado}
          className="w-full justify-between h-10 font-normal"
        >
          {value || (
            <span className="text-muted-foreground">
              {!estado ? "Primero selecciona un estado" : placeholder}
            </span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Buscar municipio..."
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>
              No se encontró el municipio.
            </CommandEmpty>
            <CommandGroup>
              {municipios.map((municipio) => (
                <CommandItem
                  key={municipio}
                  value={municipio}
                  onSelect={(current) => {
                    onChange(current === value ? "" : current)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === municipio ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {municipio}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ComboboxMunicipio