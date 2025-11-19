import { useState } from "react"
import Input from "../../../components/Input"
import Button from "../../../components/Button";
import moment from "moment";

export default function RegisterResident() {
    const [loading,setLoading] = useState(true)
    const [name,setName] = useState("");
    const [dayOfBirth,setDayOfBirth] = useState("");
    const [sex,setSex] = useState("");
    const [initialClinicalHistory,setinitialClinicalHistory] = useState("");
    const [data,setData] = useState({
        name: "",
        dayOfBirth: "",
        sex: "",
        initialClinicalHistory: ""
    })
    
    const createDataObject = (event)=>{
        event.preventDefault();

        const dataObj = {
            name: name,
            dayOfBirth: dayOfBirth,
            sex: sex,
            initialClinicalHistory: initialClinicalHistory
        }
        setData()

        return dataObj
    }

    const checkData = (data) => {
        const ok = Object.values(data).every(value => value.trim() !== "");

        if (!ok) {
            alert("Preencha todos os campos");
            return false;
            }

            alert("Cadastro feito com sucesso!");
            return true;
    };

    
    return (
        <div>
            <form 
                className="space-y-4 p-6 bg-white rounded-md shadow flex flex-col"
            >
                <h2 
                    className="text-2xl font-bold text-center mb-2">
                    Cadastro de novo morador
                </h2>

                <p className="justify-center flex">Nome completo</p>
                <Input 
                    type="text" 
                    placeholder="Digite o nome do morador"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
                <p className="justify-center flex">Data de nascimento</p>
                <Input
                    type="date"
                    placeholder="Data de nascimento"
                    value={dayOfBirth}
                    onChange={(e)=>{setDayOfBirth(e.target.value)}}
                />
                <p className="justify-center flex">Sexo</p>
                <label>
                <Input
                    type="radio"
                    name="sexo"
                    value="masculino"
                    checked={sex === "masculino"}
                    onChange={(e) => setSex(e.target.value)}
                />
                Masculino
                </label>

                <label>
                <Input
                    type="radio"
                    name="sexo"
                    value="feminino"
                    checked={sex === "feminino"}
                    onChange={(e) => setSex(e.target.value)}
                />
                Feminino
                </label>
                <p className="justify-center flex">Histórico clínico inicial</p>
                <textarea
                    value={initialClinicalHistory}
                    onChange={(e)=> setinitialClinicalHistory(e.target.value)}
                    rows={4}
                    className="bg-slate-200 shadow border border-slate-300 rounded-md"
                />
                
                <Button onClick={(e)=>{
                    const dataObj = createDataObject(e);
                    checkData(dataObj);
                }}>Cadastrar</Button>
            </form>
        </div>
    )
}