import Login from "./components/Login";
import Title from "./components/Title";
import medico from "./assets/medico.svg";

export default function App() {

  return (
    <div className="w-screen h-screen bg-blue-400 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Title>
            Saúde
            <br />
            na Rua
          </Title>
          <img src={medico} alt="ícone de médico" className="w-25 h-25" />
        </div>

        <Login />
      </div>
    </div>
  );
}
