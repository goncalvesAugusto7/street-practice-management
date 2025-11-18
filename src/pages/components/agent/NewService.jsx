import { useState } from "react"
import { Globe, Check } from "lucide-react"
import Input from "../../../components/Input"
import Button from "../../../components/Button";

export default function NewService() {
    const [residents,setResidents] = useState([]);
    const [selectedResident,setSelectedResident] = useState("");
    const [date,setDate] = useState("");
    const [hour,setHour] = useState("");
    const [location,setLocation] = useState("");
    const [locationOutput, setLocationOutput] = useState("")
    const [service,setService] = useState("")
    const [selectedService,setSelectedService] = useState([]);
    const [observations,setObservations] = useState("")
    const [data,setData] = useState(
        {
            resident: "",
            date: "",
            hour: "",
            location: "",
            service: "",
            observations: "",
        }
    )

    const createDataObject = (event) => {
        event.preventDefault()

        setData(
            {
            resident: selectedResident,
            date: date,
            hour: hour,
            location: location,
            service: service,
            observations: observations,
        }    
    )
        const ok = Object.values(data).every(value => value !== "");
        if (!ok) return alert("Preencha todos os dados")
        
        return alert("Cadastro feito com sucesso!")
    }


    const getResidents = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch("/api/routes");
            const data = await response.json();

            setResidents(data.residents);
            
            console.log("PEGOU OS RESIDENTES: " + data.residents)
        } catch(error) {
            console.log("Erro ao buscar moradores: "+error)
        }
    }

    const getLocation = (event)=>{
        event.preventDefault()
        if (!navigator.geolocation) {
            alert("Não foi possível pegar sua geolocalização")
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => {
                console.log(error);
                alert("Error ao obter lcoalização");
            }
        );
        setLocationOutput("Localização registrada com sucesso")
    };

    const getService = async (event) => {
        try {
            event.preventDefault()

            const response = await fetch("/api/routes")
            const data = await response.json()

            setService(data.services)
        } catch (error) {
            console.log("Erro ao pegar serviços: " + error)
        }
    }

    return (
        <div>
            <form 
                className="space-y-4 p-6 bg-white rounded-md shadow flex flex-col"
            >
                <p className="justify-center flex">Morador</p>
                <select 
                    onClick={getResidents}
                    value={selectedResident} 
                    onChange={(e)=> setSelectedResident(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">Selecione um morador</option>
                    
                    {Array.isArray(residents) && residents.map((r,index) =>(
                        <option key={index} value={r.name}>
                            {r.name}
                        </option>
                    ))}

                </select>

                <p className="justify-center flex">Data do atendimento</p>
                <Input type="date" value={date} onChange={(e)=>setDate(e.target.value)}/>

                <p className="justify-center flex">Horário do atendimento</p>
                <Input type="time" value={hour} onChange={(e)=>setHour(e.target.value)}/>

                <Button
                    onClick={getLocation}
                >
                    <Globe size={24}/>Registrar localização <br />
                </Button>
                {locationOutput && (
                    <p 
                    className="text-green-600 font-semibold mt-2 justify-center flex">
                        <Check size={23}/>{locationOutput}
                    </p>
                )}
                <p className="justify-center flex">Atendimento prestado</p>
                <select
                    onClick={getService}
                    value={selectedService}
                    onChange={(e)=>setSelectedService(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value={""}>Selecione o tipo de serviço prestado</option>

                    {Array.isArray(service) && service.map((r,index) => (
                        <option key={index} value={r.type}>
                            {r.type}
                        </option>
                    ))}

                </select>

                <textarea 
                    value={observations}
                    onChange={(e)=> setObservations(e.target.value)}
                    rows={5}
                    className="bg-slate-200 shadow border border-slate-300 rounded-md"
                >
                </textarea>
                                
                <Button onClick={createDataObject}>Registrar</Button>
            </form>
            

        </div>
    )
}