// Quiz — Conectado al endpoint /api/match/find de Dani (AUR-B09)
// Formato de mensajes: { role, parts: [{ text }] } (formato Gemini)
// Respuesta: { figura: { nombre, region, epoca, ... }, injusticias_detectadas }

import { useState, useEffect } from "react";
import { questions } from "../data/questions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Users } from "lucide-react";
import MatchReveal from "@/components/MatchReveal";

interface MatchFigura {
  nombre: string;
  region: string;
  epoca: string;
  injusticias: string[];
  categoria_campo: string;
  imagen_url?: string;
  explicacion?: string;
}

interface QuizProps {
  onComplete?: () => void;
}

const Quiz = ({ onComplete }: QuizProps) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  const [matchResult, setMatchResult] = useState<MatchFigura | null>(null);
  const [loadingResult, setLoadingResult] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnswer = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[current] = option;
    setAnswers(newAnswers);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  // Construir mensajes en formato Gemini (parts[0].text)
  const buildMessages = () => {
    return answers.map((ans, i) => ({
      role: "user",
      parts: [{ text: `${questions[i].question}: ${ans}` }],
    }));
  };

  const fetchMatch = async () => {
    setLoadingResult(true);
    setError(null);

    try {
      const response = await fetch("/api/match/find", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: buildMessages(),
          modo: 2, // reflexivo para onboarding
          language: "es",
        }),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();

      // La respuesta viene anidada en data.figura
      const figura = data.figura;

      if (!figura || !figura.nombre) {
        throw new Error("No se recibió una figura válida");
      }

      setMatchResult(figura);

      // Guardar match y perfil en localStorage
      if (onComplete) {
        const userProfileText = answers
          .map((ans, i) => `${questions[i].question}: ${ans}`)
          .join("\n");
        localStorage.setItem("herstory-user-profile", userProfileText);
        localStorage.setItem("herstory-match", JSON.stringify(figura));
      }
    } catch (err) {
      console.error("Error al obtener match:", err);
      setError("No pudimos conectar con el servidor. Intenta de nuevo.");
    } finally {
      setLoadingResult(false);
    }
  };

  useEffect(() => {
    if (finished) fetchMatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  const progress = finished ? 100 : ((current + 1) / questions.length) * 100;

  // Revelación cinematográfica del match
  if (matchResult) {
    return (
      <MatchReveal
        figura={matchResult}
        onContinue={() => {
          if (onComplete) {
            onComplete();
          } else {
            window.location.reload();
          }
        }}
      />
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3">
      {!finished ? (
        <Card className="elegant-shadow smooth-transition hover:glow-shadow">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary" className="text-sm font-semibold">
                <Users className="h-3 w-3 mr-1" />
                Quiz de Mujeres Históricas
              </Badge>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-medium">
                  {current + 1} / {questions.length}
                </span>
              </div>
            </div>
            <Progress value={progress} className="w-full mb-4 h-2" />
            <CardTitle className="text-xl font-bold text-center leading-relaxed">
              {questions[current].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {questions[current].options.map((option, idx) => (
              <Button
                key={idx}
                variant={answers[current] === option ? "hero" : "outline"}
                className="w-full text-left justify-start h-auto p-4 text-wrap"
                onClick={() => handleAnswer(option)}
              >
                <span className="mr-3 font-bold text-primary">
                  {String.fromCharCode(65 + idx)}.
                </span>
                <span className="flex-1">{option}</span>
              </Button>
            ))}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Loading */}
          {loadingResult && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-card/95 backdrop-blur-md border rounded-2xl p-8 elegant-shadow animate-scale-in">
                <div className="text-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 mx-auto border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                  </div>
                  <p className="text-lg font-medium text-foreground">
                    Buscando tu conexión histórica...
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Analizando tus respuestas
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && !loadingResult && (
            <Card className="elegant-shadow">
              <CardContent className="p-8 text-center space-y-4">
                <p className="text-muted-foreground">{error}</p>
                <Button
                  variant="hero"
                  onClick={() => {
                    setError(null);
                    fetchMatch();
                  }}
                >
                  Reintentar
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;