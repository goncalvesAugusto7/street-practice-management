export default [
  {
    url: '/api/routes',
    method: 'get',
    response: () => {
      return {
        logins: [
          { 
            login: "admin", 
            password: "123", 
            accessLevel: 0 
        },
          { 
            login: "agente", 
            password: "123", 
            accessLevel: 1 
        }
        ],
        residents: [
          { 
            name: "Peter Parker", 
            dateOfBirth: "10-08-1962", 
            sex: "masculino",
            initialClinicalHistory: "paciente estava com quadros de alergia e envenenamento após picada de aranha"
        },
          { 
            name: "Naruto Uzumaki", 
            dateOfBirth: "21-09-1999", 
            sex: "masculino",
            initialClinicalHistory: "morador da aldeia da folha tem uma raposa dentro do estômago dele"
        }
        ],
        services: [
          {
            type:"Atendimento Clínico Geral",
            responsibleProfessional: "Técnico em enfermagem"
          },
          {
            type:"Primeiros Socorros",
            responsibleProfessional: "Técnico em enfermagem"
          },
          {
            type:"Vacinação",
            responsibleProfessional: "Técnico em enfermagem"
          },
          {
            type:"Teste Rápido",
            responsibleProfessional: "Técnico em enfermagem"
          },
          {
            type:"Acolhimento e Escuta Qualificada",
            responsibleProfessional: "Técnico em enfermagem"
          },
          {
            type:"Orientações Psicossociais",
            responsibleProfessional: "Técnico em enfermagem"
          },
          {
            type:"Encaminhamento para Tratamento",
            responsibleProfessional: "Técnico em enfermagem"
          },

        ],
        locations: [
          {
            id: 1,
            latitude: -2.554899, 
            longitude: -44.265552
          },
          {
            id: 2,
            latitude: -2.559202, 
            longitude:-44.307785
          },
          {
            id: 3,
            latitude: -2.527992, 
            longitude:-44.254127
          }
        ]
      }
    }
  }
]
