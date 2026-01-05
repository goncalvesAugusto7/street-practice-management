import Login from "./components/Login";
import Title from "./components/Title";
import medico from "./assets/medico.svg";
import { useEffect } from "react";
import axios from "axios";

export default function App() {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://animated-meme-r4p96jvqq6r43wr-8080.app.github.dev/api/users"
      );
      console.log(response.data.logins);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
