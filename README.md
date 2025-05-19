leetlab/
├── backend/                   # Backend-related code
│   ├── dist/                  # Compiled JavaScript files (auto-generated)
│   ├── src/                   # Source code for the backend
│   │   ├── controllers/       # Request handlers for API routes
│   │   │   ├── problemController.ts
│   │   │   ├── userController.ts
│   │   │   └── submissionController.ts
│   │   ├── db/                # Database-related files
│   │   │   └── prisma/        # Prisma schema and migrations
│   │   │       ├── schema.prisma
│   │   │       └── migrations/
│   │   ├── interfaces/        # TypeScript interfaces for type safety
│   │   │   ├── problem.ts
│   │   │   └── user.ts
│   │   ├── middleware/        # Custom middleware (e.g., auth, error handling)
│   │   │   ├── auth.ts
│   │   │   └── errorHandler.ts
│   │   ├── repositories/      # Data access layer (interacts with the database)
│   │   │   ├── problemRepository.ts
│   │   │   └── userRepository.ts
│   │   ├── routes/            # API routes
│   │   │   ├── problemRoutes.ts
│   │   │   ├── userRoutes.ts
│   │   │   └── index.ts
│   │   ├── services/          # Business logic
│   │   │   ├── problemService.ts
│   │   │   └── userService.ts
│   │   ├── types/             # Custom TypeScript types
│   │   │   └── index.ts
│   │   ├── utils/             # Utility functions (e.g., validators, helpers)
│   │   │   └── validator.ts
│   │   └── app.ts             # Main entry point for the backend
│   ├── tests/                 # Backend tests
│   │   ├── unit/
│   │   └── integration/
│   ├── .env                   # Environment variables
│   ├── .gitignore             # Git ignore file
│   ├── package.json           # Backend dependencies
│   └── tsconfig.json          # TypeScript configuration
├── frontend/                  # Frontend-related code (if separate)
│   ├── public/                # Static files (e.g., index.html, favicon)
│   ├── src/
│   │   ├── assets/            # Static assets (images, fonts, etc.)
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ProblemCard.tsx
│   │   │   └── CodeEditor.tsx
│   │   ├── pages/             # Page components (e.g., React/Vue/Angular)
│   │   │   ├── ProblemList.tsx
│   │   │   ├── ProblemDetail.tsx
│   │   │   └── Profile.tsx
│   │   ├── hooks/             # Custom React hooks (if using React)
│   │   │   └── useAuth.ts
│   │   ├── context/           # React context or state management
│   │   │   └── AuthContext.tsx
│   │   ├── styles/            # CSS/SCSS files
│   │   │   └── global.css
│   │   ├── App.tsx            # Main app component
│   │   └── main.tsx           # Entry point for the frontend
│   ├── tests/                 # Frontend tests
│   ├── .env                   # Frontend environment variables
│   ├── .gitignore
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml         # Docker configuration (if using Docker)
├── README.md                  # Project documentation
└── .gitignore                 # Root-level gitignore