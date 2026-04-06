import { useMemo, useState } from "react";
import {
  Mic,
  Loader2,
  Sparkles,
  CheckCircle2,
  BarChart3,
  Moon,
  Sun,
} from "lucide-react";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const isDark = theme === "dark";

  const resultData = useMemo(
    () => ({
      socialPost:
        "Запускаем AI Business Fast-Track: превращаем голосовые идеи в готовый контент, задачи и аналитику за минуты. Скорость, фокус и результат для команд нового поколения. 🚀✨ #AI #Startup #Productivity",
      teamTasks: [
        "Утвердить оффер и ключевой value proposition.",
        "Собрать MVP-демо и лендинг для ранних заявок.",
        "Запустить тестовую кампанию в соцсетях и собрать лиды.",
        "Провести 10 интервью с потенциальными клиентами.",
      ],
      analytics:
        "Идея показывает высокий потенциал: экономия времени команды до 35% и ускорение вывода гипотез на рынок. При среднем чеке B2B-модели ожидаемая маржинальность выглядит устойчиво положительной.",
    }),
    []
  );

  const startVoiceFlow = () => {
    if (isRecording || isLoading) return;

    setHasResult(false);
    setIsRecording(true);

    setTimeout(() => {
      setIsRecording(false);
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        setHasResult(true);
      }, 2000);
    }, 1100);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-zinc-950 text-zinc-100" : "bg-zinc-50 text-zinc-900"
      }`}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-10">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <p
              className={`mb-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${
                isDark
                  ? "border-zinc-800 bg-zinc-900 text-zinc-300"
                  : "border-zinc-200 bg-white text-zinc-600"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              AI Business Fast-Track
            </p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Voice to Strategy in Seconds
            </h1>
            <p
              className={`mt-2 text-sm sm:text-base ${
                isDark ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              Минималистичный демонстрационный интерфейс для питча инвесторам.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition hover:scale-105 ${
              isDark
                ? "border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
                : "border-zinc-200 bg-white hover:bg-zinc-100"
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </header>

        <main className="flex flex-1 flex-col items-center">
          <section className="mb-12 flex w-full max-w-xl flex-col items-center text-center">
            <button
              type="button"
              onClick={startVoiceFlow}
              className={`group relative inline-flex h-44 w-44 items-center justify-center rounded-full border text-sm font-medium transition-all duration-300 sm:h-52 sm:w-52 ${
                isDark
                  ? "border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
                  : "border-zinc-300 bg-white hover:bg-zinc-100"
              } ${
                isRecording ? "animate-pulse scale-105 shadow-2xl shadow-cyan-500/20" : ""
              }`}
              disabled={isLoading}
            >
              <span
                className={`absolute inset-0 rounded-full ${
                  isRecording ? "ring-2 ring-cyan-400/70 ring-offset-4 ring-offset-transparent" : ""
                }`}
              />
              {isLoading ? (
                <Loader2 className="h-8 w-8 animate-spin" />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Mic className="h-8 w-8" />
                  <span>Начать запись голоса</span>
                </div>
              )}
            </button>

            <p className={`mt-5 text-sm ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              {isRecording
                ? "Идет запись..."
                : isLoading
                ? "Обрабатываем идею и генерируем результат..."
                : "Нажмите, чтобы запустить быстрый AI-пайплайн"}
            </p>
          </section>

          {hasResult && (
            <section className="grid w-full grid-cols-1 gap-4 pb-8 md:grid-cols-3">
              <article
                className={`rounded-2xl border p-5 backdrop-blur ${
                  isDark ? "border-zinc-800 bg-zinc-900/80" : "border-zinc-200 bg-white/90"
                }`}
              >
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-violet-400" />
                  <h2 className="text-base font-semibold">Пост для соцсетей</h2>
                </div>
                <p className={isDark ? "text-zinc-300" : "text-zinc-700"}>
                  {resultData.socialPost}
                </p>
              </article>

              <article
                className={`rounded-2xl border p-5 ${
                  isDark ? "border-zinc-800 bg-zinc-900/80" : "border-zinc-200 bg-white/90"
                }`}
              >
                <div className="mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <h2 className="text-base font-semibold">Задачи для команды</h2>
                </div>
                <ul className={`space-y-2 text-sm ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
                  {resultData.teamTasks.map((task) => (
                    <li key={task} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article
                className={`rounded-2xl border p-5 ${
                  isDark ? "border-zinc-800 bg-zinc-900/80" : "border-zinc-200 bg-white/90"
                }`}
              >
                <div className="mb-3 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-cyan-400" />
                  <h2 className="text-base font-semibold">Аналитика идеи</h2>
                </div>
                <p className={`text-sm ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
                  {resultData.analytics}
                </p>
              </article>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
