// PAN-F04 [FRONT] — Daf — Semana 2 + Semana 4
// Calculadora funcional como página completa de camuflaje
// Solo funciona con código personal de la usuaria (no hay default)
// Si no hay código en localStorage, el retorno secreto está deshabilitado

import { useState } from "react";

interface CamouflageCalculatorProps {
  onExit: () => void;
}

const CamouflageCalculator = ({ onExit }: CamouflageCalculatorProps) => {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNext, setWaitingForNext] = useState(false);
  const [secretSequence, setSecretSequence] = useState("");

  const getSecretCode = (): string | null => {
    return localStorage.getItem("herstory-panic-code");
  };

  const checkSecretCode = (sequence: string) => {
    const code = getSecretCode();
    // Sin código configurado, no hay retorno secreto
    if (!code) return;

    const lastDigits = sequence.slice(-code.length);
    if (lastDigits === code) {
      onExit();
    }
  };

  const handleNumber = (num: string) => {
    const newSequence = secretSequence + num;
    const code = getSecretCode();
    const maxLen = code ? code.length : 8;
    setSecretSequence(newSequence.slice(-maxLen));

    if (waitingForNext) {
      setDisplay(num);
      setWaitingForNext(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    setSecretSequence("");
    setPrevValue(display);
    setOperator(op);
    setWaitingForNext(true);
  };

  const handleEquals = () => {
    checkSecretCode(secretSequence);

    if (!prevValue || !operator) return;

    const prev = parseFloat(prevValue);
    const current = parseFloat(display);
    let result = 0;

    switch (operator) {
      case "+": result = prev + current; break;
      case "−": result = prev - current; break;
      case "×": result = prev * current; break;
      case "÷": result = current !== 0 ? prev / current : 0; break;
    }

    const formatted = Number.isInteger(result)
      ? result.toString()
      : parseFloat(result.toFixed(8)).toString();

    setDisplay(formatted);
    setPrevValue(null);
    setOperator(null);
    setWaitingForNext(true);
    setSecretSequence("");
  };

  const handleClear = () => {
    setDisplay("0");
    setPrevValue(null);
    setOperator(null);
    setWaitingForNext(false);
    setSecretSequence("");
  };

  const handleToggleSign = () => {
    setDisplay((parseFloat(display) * -1).toString());
  };

  const handlePercent = () => {
    setDisplay((parseFloat(display) / 100).toString());
  };

  const handleDecimal = () => {
    if (waitingForNext) {
      setDisplay("0.");
      setWaitingForNext(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const isOperatorActive = (op: string) => operator === op && waitingForNext;

  const formatDisplay = (value: string) => {
    if (value.length > 9) {
      return parseFloat(value).toExponential(3);
    }
    return value;
  };

  type ButtonVariant = "number" | "operator" | "function" | "equals";

  const buttonStyles: Record<ButtonVariant, string> = {
    number: "bg-[#333333] text-white hover:bg-[#444444] active:bg-[#555555]",
    operator: "bg-[#FF9500] text-white hover:bg-[#FFB143] active:bg-[#FFD080]",
    function: "bg-[#A5A5A5] text-black hover:bg-[#BDBDBD] active:bg-[#D0D0D0]",
    equals: "bg-[#FF9500] text-white hover:bg-[#FFB143] active:bg-[#FFD080]",
  };

  const Button = ({
    label,
    variant = "number",
    wide = false,
    onPress,
    active = false,
  }: {
    label: string;
    variant?: ButtonVariant;
    wide?: boolean;
    onPress: () => void;
    active?: boolean;
  }) => (
    <button
      onClick={onPress}
      className={`
        ${wide ? "col-span-2" : ""}
        ${active ? "bg-white text-[#FF9500]" : buttonStyles[variant]}
        rounded-full font-light
        text-xl sm:text-2xl lg:text-3xl
        flex items-center ${wide ? "justify-start pl-6 sm:pl-8 lg:pl-10" : "justify-center"}
        h-16 sm:h-[72px] lg:h-20
        w-full
        transition-colors duration-75
        select-none
      `}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 bg-[#1C1C1E] z-[9999] flex flex-col">
      <div className="flex-1 flex flex-col justify-end w-full max-w-2xl mx-auto px-4 pb-4 lg:px-12 lg:pb-8 lg:justify-center">
        {/* Display */}
        <div className="flex items-end justify-end px-2 pb-4 lg:pb-8 min-h-[120px] lg:min-h-[160px]">
          <span
            className="text-white font-thin leading-none"
            style={{
              fontSize: display.length > 9
                ? "clamp(36px, 8vw, 56px)"
                : display.length > 6
                ? "clamp(44px, 10vw, 72px)"
                : "clamp(52px, 14vw, 88px)",
            }}
          >
            {formatDisplay(display)}
          </span>
        </div>

        {/* Botones */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          <Button label={display !== "0" ? "C" : "AC"} variant="function" onPress={handleClear} />
          <Button label="+/-" variant="function" onPress={handleToggleSign} />
          <Button label="%" variant="function" onPress={handlePercent} />
          <Button label="÷" variant="operator" onPress={() => handleOperator("÷")} active={isOperatorActive("÷")} />

          <Button label="7" onPress={() => handleNumber("7")} />
          <Button label="8" onPress={() => handleNumber("8")} />
          <Button label="9" onPress={() => handleNumber("9")} />
          <Button label="×" variant="operator" onPress={() => handleOperator("×")} active={isOperatorActive("×")} />

          <Button label="4" onPress={() => handleNumber("4")} />
          <Button label="5" onPress={() => handleNumber("5")} />
          <Button label="6" onPress={() => handleNumber("6")} />
          <Button label="−" variant="operator" onPress={() => handleOperator("−")} active={isOperatorActive("−")} />

          <Button label="1" onPress={() => handleNumber("1")} />
          <Button label="2" onPress={() => handleNumber("2")} />
          <Button label="3" onPress={() => handleNumber("3")} />
          <Button label="+" variant="operator" onPress={() => handleOperator("+")} active={isOperatorActive("+")} />

          <button
            onClick={() => handleNumber("0")}
            className="col-span-2 bg-[#333333] text-white hover:bg-[#444444] active:bg-[#555555]
                       rounded-full text-xl sm:text-2xl lg:text-3xl font-light
                       flex items-center justify-start pl-6 sm:pl-8 lg:pl-10
                       h-16 sm:h-[72px] lg:h-20 w-full
                       transition-colors duration-75 select-none"
          >
            0
          </button>
          <Button label="." onPress={handleDecimal} />
          <Button label="=" variant="equals" onPress={handleEquals} />
        </div>
      </div>
    </div>
  );
};

export default CamouflageCalculator;