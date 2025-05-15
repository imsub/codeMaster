import axios from "axios"
import { injectable, inject } from 'inversify';

@injectable()
export class Judge0Service {
    constructor() {
        // Initialize any properties or dependencies here if needed
    }
    async submitCode(submission:object) {
        const { data } = await axios.post(`${process.env.JUDGE0_API_URL}/submissions?base64_encoded=false`, submission, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return data;
    }
    async getSubmissionResult(token:string) {
        const { data } = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/${token}`, {
            params: {
                base64_encoded: false,
            },
        });

        return data;
    }
    async getSubmissionResultBatch(tokens:string[]) {
        const { data } = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`, {
            params: {
                tokens: tokens.join(","),
                base64_encoded: false,
            },
        });

        return data;
    }
    async submitBatch(submissions:object[]) {
        const { data } = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`, {
            submissions,
        });

        return data; // [{token} , {token} , {token}]
    }
    async pollBatchResults(tokens:string[]) {
        while (true) {
            const { data } = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`, {
                params: {
                    tokens: tokens.join(","),
                    base64_encoded: false,
                },
            });

            const results = data.submissions;

            const isAllDone = results.every(
                (r:any) => r.status.id !== 1 && r.status.id !== 2
            );

            if (isAllDone) return results;
            await this.sleep(1000);
        }
    }

    sleep(ms:number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    getLanguageName(languageId:number) {
        const LANGUAGE_NAMES = {
            74: "TypeScript",
            63: "JavaScript",
            71: "Python",
            62: "Java",
        };

        return LANGUAGE_NAMES[languageId] || "Unknown";
    }
    getJudge0LanguageId(language:string) {
        const languageMap = {
            PYTHON: 71,
            JAVA: 62,
            JAVASCRIPT: 63,
        };

        return languageMap[language.toUpperCase()];
    }
}






















// export const submitBatch = async (submissions)=>{
//     const {data} = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,{
//         submissions
//     })


//     console.log("Submission Results: ", data)

//     return data // [{token} , {token} , {token}]
// }


