import { useState } from "react"
import Input from "../../../components/Input"
import Button from "../../../components/Button";


export default function RegisterResident() {
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

        setData({
            name: name,
            dayOfBirth: dayOfBirth,
            sex: sex,
            initialClinicalHistory: initialClinicalHistory
        })
        const ok = Object.values(data).every(value => value !== "")
        if (!ok) {
            return alert("Preencha todos os campos")
        }
        return alert("Cadastro feito com sucesso!")
    }
    
    return (
        <div>
            <form 
                className="space-y-4 p-6 bg-white rounded-md shadow flex flex-col"
            >
                <p className="justify-center flex">Nome</p>
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
                
                <Button onClick={createDataObject}>Cadastrar</Button>
            </form>
        </div>
    )
}