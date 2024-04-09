import localFont from "next/font/local";
import Quiz from "./Quiz/page";
const fontSerif = localFont({ src: "../fonts/NotoSerifTangut.ttf" });
const fontSageffine = localFont({ src: "../fonts/Sageffine.otf" });

export default function Home() {
  const year = new Date().getFullYear();
  return (
    <div className={fontSerif.className}>
      <main>
        <Quiz />
      </main>
      <footer className="bg-rojoClaro">
        <p className="font-thin text-xs text-center p-2">
          Arcenix Company Todos Los Derechos Reservados {year}
        </p>
      </footer>
    </div>
  );
}
