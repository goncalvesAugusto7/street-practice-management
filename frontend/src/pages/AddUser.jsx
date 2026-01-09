import { useForm } from 'react-hook-form' 
import { useNavigate } from 'react-router-dom'
import { ArrowLeftCircle } from 'lucide-react'
import { createUser, uploadProfilePicture } from '../services/userService'
import  validator from 'validator'
import { useState } from 'react'

export default function AddUser() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    const watchPassword = watch("password")
    const [showConfirm,setShowConfirm] = useState(false)
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await createUser(data)
            
            const publicId = response.data.public_id
            
            if (data.photo?.length > 0) {
                const formData = new FormData()
                formData.append('file', data.photo[0])
                
                await uploadProfilePicture(publicId, formData)
                console.log("Imagem subida!")
            }else console.log("Usuário não subiu imagem");
            

            console.log("Usuário criado!")
            alert("Usuário criado com sucesso!")
            navigate(-1)
        } catch(error) {
            if (error.response) {
                console.error("Erro da API:", error.response.data.error);
                alert(error.response.data.error+"\nCadastro não realizado")
            } else {
                console.error("Erro inesperado:", error.message);
            }
        }
    }


    return (
        <div className="min-h-screen bg-blue-400 pt-10 pb-10 px-4">
            <div className="max-w-2xl mx-auto">

                <button 
                    onClick={() => navigate(-1)}
                    className='flex items-center text-white/90 hover:text-white mb-4 transition-colors group'
                >
                    <ArrowLeftCircle size={20} className='mr-1.5 transform group-hover:-translate-x-1 transition-transform'/>
                    <span className='font-medium'>Voltar</span>
                </button>


                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-2xl font-bold text-white uppercase tracking-wider">
                        Adicionando Usuário
                    </h1>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="p-6 md:p-8 space-y-6"
                    >

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                            {/* Nome */}
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-blue-500 uppercase tracking-tight mb-1">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nome completo do usuário..."
                                    {...register("name", { required: true })}
                                    className={`w-full rounded-lg border px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                                        errors.name ? "border-red-400" : "border-slate-300"
                                    }`}
                                />
                                {errors.name && (
                                    <p className="text-xs text-red-500 mt-1">
                                        Nome é obrigatório.
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-xs font-bold text-blue-500 uppercase tracking-tight mb-1">
                                    E-mail
                                </label>
                                <input
                                    type="text"
                                    placeholder="E-mail do usuário..."
                                    {...register("email", {
                                        required: true,
                                        validate: (value) => validator.isEmail(value),
                                    })}
                                    className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                                        errors.email ? "border-red-400" : "border-slate-300"
                                    }`}
                                />
                                {errors.email?.type === "required" && (
                                    <p className="text-xs text-red-500 mt-1">
                                        E-mail é obrigatório.
                                    </p>
                                )}
                                {errors.email?.type === "validate" && (
                                    <p className="text-xs text-red-500 mt-1">
                                        E-mail inválido.
                                    </p>
                                )}
                            </div>

                            {/* Login */}
                            <div>
                                <label className="block text-xs font-bold text-blue-500 uppercase tracking-tight mb-1">
                                    Login
                                </label>
                                <input
                                    type="text"
                                    placeholder="Login do usuário..."
                                    {...register("login", { required: true })}
                                    className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                                        errors.login ? "border-red-400" : "border-slate-300"
                                    }`}
                                />
                                {errors.login && (
                                    <p className="text-xs text-red-500 mt-1">
                                        Login é obrigatório.
                                    </p>
                                )}
                            </div>

                            {/* CPF */}
                            <div>
                                <label className="block text-xs font-bold text-blue-500 uppercase tracking-tight mb-1">
                                    CPF
                                </label>
                                <input
                                    type="text"
                                    maxLength="11"
                                    placeholder="CPF do usuário..."
                                    {...register("cpf", { 
                                        required: true,
                                        validate: (value) => /^[0-9]+$/.test(value) || "Apenas números são permitidos"
                                    })}
                                    className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                                        errors.cpf ? "border-red-400" : "border-slate-300"
                                    }`}
                                />
                                {errors.cpf?.type === 'required' && (
                                    <p className="text-xs text-red-500 mt-1">
                                        CPF é obrigatório.
                                    </p>
                                )}
                                {errors.cpf?.type === 'validate' && (
                                    <p className="text-xs text-red-500 mt-1">
                                        Caracteres numéricos apenas.
                                    </p>
                                )}

                                
                            </div>

                            {/* Senha */}
                            <div>
                                <label className="block text-xs font-bold text-blue-500 uppercase tracking-tight mb-1">
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    placeholder="Senha do usuário..."
                                    {...register("password", { required: true, minLength: 8 })}
                                    className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                                        errors.password ? "border-red-400" : "border-slate-300"
                                    }`}
                                />
                                {errors.password && (
                                    <p className="text-xs text-red-500 mt-1">
                                        Senha deve ter no mínimo 8 caracteres.
                                    </p>
                                )}
                            </div>

                            {/* Confirmar senha */}
                            <div>
                                <label className="block text-xs font-bold text-blue-500 uppercase tracking-tight mb-1">
                                    Confirmar senha
                                </label>
                                <input
                                    type="password"
                                    placeholder="Confirme a senha..."
                                    {...register("confirmPassword", {
                                        required: true,
                                        validate: (value) => value === watchPassword,
                                    })}
                                    className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                                        errors.confirmPassword ? "border-red-400" : "border-slate-300"
                                    }`}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-xs text-red-500 mt-1">
                                        As senhas não coincidem.
                                    </p>
                                )}
                            </div>

                        </div>

                        {/* Foto de perfil */}
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-blue-500 uppercase tracking-tight mb-1">
                                Foto do Usuário
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                {...register("photo")}
                                className="block w-full text-sm text-slate-600
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-100 file:text-blue-700
                                hover:file:bg-blue-200
                                cursor-pointer"
                            />

                            {errors.photo && (
                                <p className="text-xs text-red-500 mt-1">
                                {errors.photo.message}
                                </p>
                            )}
                        </div>


                        {/* Access level */}
                        <div className="flex items-center gap-2 mt-4">
                            <input
                                type="checkbox"
                                {...register("access_level")}
                                className="w-4 h-4 text-blue-500 border-slate-300 rounded focus:ring-blue-400"
                            />
                            <label className="text-sm font-medium text-slate-700">
                                Usuário Gerente
                            </label>
                        </div>

                        <div className="pt-4">
                            <button
                                type="button"
                                onClick={() => setShowConfirm(true)}
                                className="w-full bg-green-500 hover:bg-green-600 text-white/90 hover:text-white font-bold uppercase tracking-wide py-3 rounded-xl transition-colors"
                            >
                                Adicionar
                            </button>
                        </div>

                        {showConfirm && (
                            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                                <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
                                <h2 className="text-lg font-bold text-slate-800 mb-2">Confirmar ação</h2>
                                <p className="text-sm text-slate-600 mb-6">
                                    Tem certeza que deseja adicionar este usuário?
                                </p>

                                <div className="flex justify-end gap-3">
                                    <button
                                    onClick={() => setShowConfirm(false)}
                                    className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600"
                                    >
                                    Cancelar
                                    </button>
                                    <button
                                    onClick={() => {
                                        handleSubmit(onSubmit)()
                                        setShowConfirm(false)
                                    }}
                                    className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600"
                                    >
                                    Confirmar
                                    </button>
                                </div>
                                </div>
                            </div>
                        )}


                    </form>
                </div>
            </div>
        </div>
    )
    }
