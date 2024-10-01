/**
* @author Nelson Sánchez Álvarez
* @date 2024/01/10
* @description DEFINITION OF CONSTANTS
*/

export const CONSTANTS = {
  METHOD: {
      GET: 'get',
      POST: 'post',
      PUT: 'put',
      DELETE: 'delete',
      PATCH: 'patch',
  },
  BASESKILLS: [
      {
        id:1,
        name:'Angular',
        description:'Cand develop in Angular'
      },
      {
        id:2,
        name:'C#',
        description:'Cand develop in C#'
      }, {
        id:3,
        name:'C++',
        description:'Cand develop in C++'
      }
   ],
   BASEPERSONS: [
      {
        id: 1,      
        name :'Jhon Doe', 
        skills:[
          {
            id:1,
            name:'Angular',
            description:'Cand develop in Angular'
          },
          {
            id:2,
            name:'C#',
            description:'Cand develop in C#'
          }
        ]
      },
      {
        id: 2,      
        name :'Klark Kent', 
        skills:[
          {
            id:1,
            name:'Angular',
            description:'Cand develop in Angular'
          },
          {
            id:3,
            name:'C++',
            description:'Cand develop in C++'
          }
        ]
      },
   ],
   BASETASKS: [
    {
      id: 1,      
      name : "CREATE VELAIO TESTS",  
      status: false,
      limitDate: "2024/02/10",      
      persons:[
        {
          id: 1,      
          name :'Jhon Doe', 
          skills:[
            {
              id:1,
              name:'Angular',
              description:'Cand develop in Angular'
            },
            {
              id:2,
              name:'C#',
              description:'Cand develop in C#'
            }
          ]
        },
        {
          id: 2,      
          name :'Klark Kent', 
          skills:[
            {
              id:1,
              name:'Angular',
              description:'Cand develop in Angular'
            },
            {
              id:3,
              name:'C++',
              description:'Cand develop in C++'
            }
          ]
        },
      ]
    },   
    {
      id: 2,      
      name : "VELAIO TESTS COMPLETE",  
      status: false,
      limitDate: "2024/02/10",      
      persons:[
        {
          id: 1,      
          name :'Jhon Doe', 
          skills:[
            {
              id:1,
              name:'Angular',
              description:'Cand develop in Angular'
            },
            {
              id:2,
              name:'C#',
              description:'Cand develop in C#'
            }
          ]
        },
        {
          id: 2,      
          name :'Klark Kent', 
          skills:[
            {
              id:1,
              name:'Angular',
              description:'Cand develop in Angular'
            },
            {
              id:3,
              name:'C++',
              description:'Cand develop in C++'
            }
          ]
        },
      ]
    },  
 ],
};