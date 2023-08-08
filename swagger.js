var PropertiesReader = require("properties-reader");
var properties = PropertiesReader("config/app.properties");

const swaggerOptions = {
    definition: {
      openapi: "3.0.3",
      info: {
        title: "MVP apis",
        version: "1.0.0",
        description: "Apis for managing the microservices"
      },
      servers: [
        {
          url: 'http://localhost:3000',
        }
      ],
    //   components: {
    //     securitySchemes: {
    //       bearerAuth: {
    //         type: "apiKey",
    //         name: "Authorization",
    //         scheme: "bearer",
    //         bearerFormat: "JWT",
    //         in: "header"
    //       }
    //     }
    //   },
  
    //   securityDefinitions: {
    //     bearerAuth: {
    //       type: "apiKey",
    //       name: "Authorization",
    //       scheme: "bearer",
    //       in: "header"
    //     }
    //   }
          

    },

    apis: ["./router/*.js"]
   
  };

  module.exports = swaggerOptions;