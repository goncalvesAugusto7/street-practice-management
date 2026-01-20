import { useState, useEffect } from "react";

import Input from "../../../components/Input";
import ResidentCard from "../../../components/ResidentCard";
import api from "../../../services/api";

export default function ConsultResidents() {
  const [residents, setResidents] = useState([]);
  const [targetResidentInfo, setTargetResidentInfo] = useState("");
  const [sexFilter, setSexFilter] = useState(null);

  const getResidents = async (event) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api
          .get("/residents/")
          .then((response) => {
            console.log(response);
            setResidents(response.data);
            resolve(data);
          })
          .catch((e) => console.error(e));
      } catch (error) {
        console.error("Catched error: " + error);
        reject(error);
      }
    });
  };

  const filteredResidents = residents.filter((resident) => {
    const matchText =
      resident.name.toLowerCase().includes(targetResidentInfo.toLocaleLowerCase())

    const matchSex =
      sexFilter === null || resident.sex === sexFilter;

    return matchText && matchSex;
  });

  const filteredResidentsBy = residents.filter((resident) => resident.sex);

  useEffect(() => {
    getResidents();
  }, []);

  const FilterButton = ({ label, value, currentFilter, onClick }) => (
    <button
      onClick={() => onClick(value)}
      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border
            ${
              currentFilter === value
                ? "bg-blue-500 text-white border-blue-500 shadow-md"
                : "bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-500"
            }`}
    >
      {label}
    </button>
  );

  return (
    <div className="h-[600px] md:h-[495px] flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
      <div className="p-6 pb-2 bg-white flex flex-col items-center">
        <h2 className="text-1xl font-bold text-slate-800 text-center mb-4">
          Consulta de Moradores Cadastrados
        </h2>
        <Input
          type="text"
          placeholder="Busque pelo nome aqui..."
          value={targetResidentInfo}
          onChange={(e) => setTargetResidentInfo(e.target.value)}
        />
        <div className="flex gap-2 mt-4">
          <FilterButton
            label={"Todos"}
            value={null}
            currentFilter={sexFilter}
            onClick={setSexFilter}
          />
          <FilterButton
            label={"Homens"}
            value={"M"}
            currentFilter={sexFilter}
            onClick={setSexFilter}
          />
          <FilterButton
            label={"Mulheres"}
            value={"F"}
            currentFilter={sexFilter}
            onClick={setSexFilter}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pt-2 space-y-3 custom-scrollbar">
        {filteredResidents.length > 0 ? (
          filteredResidents.map((resident, index) => (
            <div key={resident.public_id || index}>
              <ResidentCard
                name={resident.name}
                date_of_birth={resident.date_of_birth}
                sex={resident.sex}
                initial_clinical_history={resident.initial_clinical_history}
                public_id={resident.public_id}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-slate-400 py-10">
            Nenhum morador encontrado.
          </p>
        )}
      </div>
    </div>
  );
}
