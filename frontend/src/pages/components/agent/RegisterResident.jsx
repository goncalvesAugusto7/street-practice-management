import { useForm } from "react-hook-form";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { createResident } from "../../../services/residentService";

export default function RegisterResident() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

    const onSubmit = async (data) => {
        // Adaptando os nomes para o formato da API
        const payload = {
            name: data.name,
            date_of_birth: data.dayOfBirth,
            sex: data.sex,
            initial_clinical_history: data.initialClinicalHistory
        };

        try {
            await createResident(payload);
            alert("Morador criado com sucesso!");
            window.location.reload();
        } catch (error) {
            if (error.response) {
                alert("Cadastro não realizado.");
                console.error(error.response.data.error);
            } else {
                console.error("Erro inesperado:", error.message);
            }
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 p-6 bg-white rounded-md shadow flex flex-col"
            >
                <h2 className="text-2xl font-bold text-slate-800 text-center mb-2">
                    Cadastro de novo morador
                </h2>

                <p className="justify-center flex">Nome completo</p>
                <Input
                    type="text"
                    placeholder="Digite o nome do morador"
                    {...register("name", { required: "Nome é obrigatório" })}
                />
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}

                <p className="justify-center flex">Data de nascimento</p>
                <Input
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    {...register("dayOfBirth", {
                        required: "Data de nascimento é obrigatória",
                        validate: (value) => {
                            const selectedDate = new Date(value);
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);

                            return (
                                selectedDate <= today ||
                                "A data de nascimento não pode ser futura"
                            );
                        }
                    })}
                />
                {errors.dayOfBirth && (
                    <span className="text-red-500">{errors.dayOfBirth.message}</span>
                )}

                <p className="justify-center flex">Sexo</p>
                <label>
                    <Input
                        type="radio"
                        value="M"
                        {...register("sex", { required: "Sexo é obrigatório" })}
                    />
                    Masculino
                </label>

                <label>
                    <Input
                        type="radio"
                        value="F"
                        {...register("sex", { required: "Sexo é obrigatório" })}
                    />
                    Feminino
                </label>
                {errors.sex && <span className="text-red-500">{errors.sex.message}</span>}

                <p className="justify-center flex">Histórico clínico inicial</p>
                <textarea
                    rows={4}
                    maxLength={500}
                    className="bg-slate-200 shadow border border-slate-300 rounded-md"
                    {...register("initialClinicalHistory")}
                />

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                </Button>
            </form>
        </div>
    );
}
