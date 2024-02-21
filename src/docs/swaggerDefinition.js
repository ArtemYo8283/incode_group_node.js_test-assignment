import "dotenv/config";

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Incode Group test task API documentation",
        description: "Welcome to the documentation for Incode Group test task API.",
        version: "1.0.0",
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT}/api`,
        },
    ],
};

export default swaggerDefinition;
