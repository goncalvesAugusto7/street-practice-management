import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Globe, Check, PlusCircle } from "lucide-react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import api from "../../../services/api";
import Loading from "../../../components/LoadingIcon";
import { useNavigate } from "react-router-dom";

export default function NewService() {
    const [residents, setResidents] = useState([]);
    const [services, setServices] = useState([]);
    const [locationSaved, setLocationSaved] = useState(false);
    const [userLocationFeedback, setUserLocationFeedback] = useState("");
    const [loading, setLoading] = useState(false);
    const [userPID, setUserPID] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [newDescription, setNewDescription] = useState("");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        clearErrors,
        formState: { errors, isSubmitting }
    } = useForm();

    const fetchData = async () => {
        try {
            const [residentsRes, servicesRes] = await Promise.all([
                api.get("/residents/"),
                api.get("/types_service/")
            ]);
            setResidents(residentsRes.data);
            setServices(servicesRes.data);

            const response = await api.get(
                "/auth/me",
                { withCredentials:true }
            );                
            setUserPID(response.data.public_id)
            console.log(userPID);
            
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddType = async () => {
        setLoadingAdd(true);

        try {
            await api.post(
                `/types_service/`,
                {description: newDescription}
            );
            
            setLoadingAdd(false);
            setShowAddModal(false);
            fetchData();
        } catch (error) {
            console.error(error);
            alert("Erro ao adicionar tipo de serviço. Tente novamente");
        }
    }

    const getLocation = (event) => {
        event.preventDefault();
        setLoading(true);

        if (!navigator.geolocation) {
            alert("Geolocalização não suportada");
            setUserLocationFeedback("Seu navegador não tem suporte para geolocalização");
            setLoading(false)
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setValue("location", {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                setLocationSaved(true);
                clearErrors("location");
                console.log("Localização obtida com sucesso: ", position.coords.latitude+","+position.coords.longitude)
                setUserLocationFeedback("Localização registrada")
                setLoading(false);
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        console.error("Usuário negou o acesso à geolocalização");
                        setUserLocationFeedback("Permita o acesso à sua localização para continuar")
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.error("A localização não está disponível");
                        setUserLocationFeedback("Verifique se a localização está disponível")
                        break;
                    case error.TIMEOUT:
                        console.error("O tempo de espera foi muito longo");
                        setUserLocationFeedback("O tempo de espera foi muito longo");
                        break;
                    default:
                        console.error("Erro desconhecido: " + error.message)
                }
            },
            () => {
                alert("Erro ao obter localização");
            }
        );
    };

    const onSubmit = async (data) => {
        if (!data.location) {
            setError("location", {
                type: "manual",
                message: "Localização é obrigatória"
            });
            return;
        }

        try {
            const dateTimeISO = new Date(
                `${data.date}T${data.hour}`
            ).toISOString();

            const payload = {
                date: dateTimeISO,
                observations: data.observations,
                health_worker_id: userPID,
                resident_id: data.resident,
                type_service_id: data.service,
                latitude: data.location.latitude,
                longitude: data.location.longitude

            };

            try {
                const response = await api.post("/services/", payload);
                alert("Atendimento registrado com sucesso!");
            } catch (error) {
                if (error.response) {
                    console.error(error.response.data.error);
                    alert("Erro ao registrar atendimento");
                }
            }

        } catch (error) {
            if (error.locationRes)
            console.error(error.locationRes.data.error);
            alert("Erro ao registrar localização");
        }
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 p-6 bg-white rounded-md shadow flex flex-col"
            >
                <h2 className="text-2xl font-bold text-slate-800 text-center mb-2">
                    Novo Atendimento
                </h2>

                <p className="justify-center flex">Morador</p>
                <select
                    className="border p-2 rounded"
                    {...register("resident", {
                        required: "Selecione um morador"
                    })}
                >
                    <option value="">Selecione um morador</option>
                    {residents
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((r) => (
                        <option key={r.public_id} value={r.public_id}>
                            {r.name}
                        </option>
                    ))}
                </select>
                {errors.resident && (
                    <span className="text-red-500">{errors.resident.message}</span>
                )}

                <p className="justify-center flex">Data do atendimento</p>
                <Input
                    type="date"
                    max={today}
                    {...register("date", {
                        required: "Data é obrigatória",
                        validate: (value) => {
                            const selected = new Date(value);
                            const todayDate = new Date();
                            todayDate.setHours(0, 0, 0, 0);

                            return (
                                selected <= todayDate ||
                                "A data não pode ser futura"
                            );
                        }
                    })}
                />
                {errors.date && (
                    <span className="text-red-500">{errors.date.message}</span>
                )}

                <p className="justify-center flex">Horário do atendimento</p>
                <Input
                    type="time"
                    {...register("hour", {
                        required: "Horário é obrigatório"
                    })}
                />
                {errors.hour && (
                    <span className="text-red-500">{errors.hour.message}</span>
                )}

                <Button 
                    type="button" 
                    onClick={getLocation}>
                    {loading ? (
                        <div className="flex items-center gap-2 justify-center">
                            <Loading />
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 justify-center">
                            <Globe size={20} /> 
                            Registrar localização
                        </div>
                    )}
                </Button>

                {locationSaved && (
                    <p className="text-green-600 font-semibold flex items-center gap-2 justify-center">
                        <Check size={20} /> {userLocationFeedback}
                    </p>
                )}
                {!locationSaved && (
                    <p className="text-red-600 font-semibold flex items-center gap-2 justify-center">
                        {userLocationFeedback}
                    </p>
                )}
                {errors.location && (
                    <span className="text-red-500">{errors.location.message}</span>
                )}

                <p className="justify-center flex">Atendimento prestado</p>
                <div className="flex justify-center items-center">
                    <select
                        className="border p-2 rounded"
                        {...register("service", {
                            required: "Selecione o tipo de serviço"
                        })}
                    >
                        <option value="">Selecione o tipo de serviço</option>
                        {services.map((s) => (
                            <option key={s.public_id} value={s.public_id}>
                                {s.description}
                            </option>
                        ))}
                    </select>
                    <button
                        type="button"
                        onClick={() => setShowAddModal(true)}
                        className='text-green-500 hover:text-green-600 transition pl-1 pb-2'
                    >
                        <PlusCircle size={28}/>
                    </button>

                    {errors.service && (
                        <span className="text-red-500">{errors.service.message}</span>
                    )}

                </div>

                <p className="justify-center flex">Observações</p>
                <textarea
                    rows={5}
                    className="bg-slate-200 shadow border border-slate-300 rounded-md p-2"
                    {...register("observations")}
                />


                <Button 
                    type="submit" 
                    disabled={isSubmitting}>
                    {isSubmitting ?( 
                        <span>
                            <Loading/>
                        </span>
                        ) : (
                            "Registrar"
                        )}
                </Button>
            </form>

            {showAddModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg">
                        <h2 className="text-lg font-bold text-slate-800 mb-4">
                            Novo Tipo de Serviço
                        </h2>

                        <textarea
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            rows={2}
                            maxLength={255}
                            className="w-full border rounded-lg p-3 text-sm mb-6"
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowAddModal(false);
                                }}
                                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600"
                            >
                                Cancelar
                            </button>

                            <button
                            type="button"
                                onClick={handleAddType}
                                className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
