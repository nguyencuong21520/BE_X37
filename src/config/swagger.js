import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BE X37 API",
      version: "1.0.0",
      description: "API Documentation for BE X37 Project",
      contact: {
        name: "API Support",
        email: "support@x37.com",
      },
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://your-vercel-domain.vercel.app"
            : "http://localhost:3000",
        description:
          process.env.NODE_ENV === "production"
            ? "Production server"
            : "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["name", "email", "password", "phone"],
          properties: {
            id: {
              type: "string",
              description: "Auto-generated unique identifier",
              example: "60d5ecb74b24b1001c8b4567",
            },
            name: {
              type: "string",
              description: "User full name",
              minLength: 2,
              maxLength: 50,
              example: "Nguyen Van A",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email address",
              example: "user@example.com",
            },
            phone: {
              type: "string",
              description: "User phone number (Vietnam format)",
              pattern: "^(\\+84|84|0[3|5|7|8|9])+([0-9]{8,9})$",
              example: "0912345678",
            },
            role: {
              type: "string",
              enum: ["admin", "user"],
              default: "user",
              description: "User role",
              example: "user",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Account creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
            },
          },
        },
        RegisterRequest: {
          type: "object",
          required: ["name", "email", "password", "phone"],
          properties: {
            name: {
              type: "string",
              minLength: 2,
              maxLength: 50,
              example: "Nguyen Van A",
            },
            email: {
              type: "string",
              format: "email",
              example: "user@example.com",
            },
            password: {
              type: "string",
              minLength: 6,
              maxLength: 100,
              pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)",
              description:
                "Password must contain at least 1 lowercase, 1 uppercase and 1 number",
              example: "Password123",
            },
            phone: {
              type: "string",
              pattern: "^(\\+84|84|0[3|5|7|8|9])+([0-9]{8,9})$",
              example: "0912345678",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "user@example.com",
            },
            password: {
              type: "string",
              minLength: 1,
              example: "Password123",
            },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Login successful",
            },
            user: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  example: "60d5ecb74b24b1001c8b4567",
                },
                name: {
                  type: "string",
                  example: "Nguyen Van A",
                },
                email: {
                  type: "string",
                  example: "user@example.com",
                },
                role: {
                  type: "string",
                  example: "user",
                },
              },
            },
            token: {
              type: "string",
              description: "JWT access token",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
          },
        },
        UserProfileResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Lấy thông tin user thành công",
            },
            data: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  example: "60d5ecb74b24b1001c8b4567",
                },
                name: {
                  type: "string",
                  example: "Nguyen Van A",
                },
                email: {
                  type: "string",
                  example: "user@example.com",
                },
                role: {
                  type: "string",
                  example: "user",
                },
              },
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Error message",
            },
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field: {
                    type: "string",
                    example: "email",
                  },
                  message: {
                    type: "string",
                    example: "Email là bắt buộc",
                  },
                },
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routers/*.js"], // Path to the API docs
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
