import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";
import { toast } from "react-hot-toast";
import { safe } from "../lib/safe";
import { AxiosError } from "axios";

export const useProblemStore = create((set) => ({
  problems: [],
  problem: null,
  solvedProblems: [],
  isProblemsLoading: false,
  isProblemLoading: false,
  getAllProblems: async () => {
    set({ isProblemsLoading: true });
    const [res, error] = await safe(
      axiosInstance.get("/problems/getAllProblems")
    );
    if (error) {
      const message =
        (error as AxiosError<{ message?: string }>)?.response?.data?.message ||
        "failed to fetch problem";
      console.log("Error getting all problems", error);
      toast.error(message);
    } else {
      set({ problems: res?.data.problems });
    }
    set({ isProblemsLoading: false });
  },

  getProblemById: async (id: string) => {
    set({ isProblemLoading: true });
    const [res, error] = await safe(
      axiosInstance.get(`/problems/getProblemById/${id}`)
    );
    if (error) {
      const message =
        (error as AxiosError<{ message?: string }>)?.response?.data?.message ||
        "failed to fetch problem";
      console.log("Error getting problem by ID", error);
      toast.error(message);
    } else {
      set({ problem: res?.data.problem });
      toast.success(res?.data.message);
    }
    set({ isProblemLoading: false });
  },

  getSolvedProblemByUser: async () => {
    const [res, error] = await safe(
      axiosInstance.get("/problems/getSolvedProblems")
    );
    if (error) {
      const message =
        (error as AxiosError<{ message?: string }>)?.response?.data?.message ||
        "failed to fetch problem";
      console.log("Error getting problems", error);
      toast.error(message);
    } else {
      set({ solvedProblems: res?.data.problems });
      toast.success(res?.data.message);
    }
    set({ isProblemLoading: false });
  },
}));
