import type {Problem} from "../../prisma/generated/prisma/index";

export interface IProblemService {
  createProblem(data: {
    title: string;
    description: string;
    difficulty: string;
    tags: string[];
    userId: string;
    examples: string;
    constraints: string;
    hints?: string;
    editorial?: string;
    testCases: string;
    codeSnippets: string;
    referenceSolutions: string;
  }): Promise<Problem>;
  getProblemById(id: string): Promise<Problem | null>;
}
