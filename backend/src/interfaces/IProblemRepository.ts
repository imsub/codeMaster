import type {Problem} from "../../prisma/generated/prisma/index";

export interface IProblemRepository {
  create(data: {
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
  findById(id: string): Promise<Problem | null>;
}
