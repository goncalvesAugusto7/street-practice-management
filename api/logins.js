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
        ]
      }
    }
  }
]
