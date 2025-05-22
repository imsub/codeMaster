interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = "http://127.0.0.1:3000/api/v1";
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  async customFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const headers = { ...this.defaultHeaders, ...options.headers };

      const config: FetchOptions = {
        ...options,
        headers,
        credentials: "include",
      };

      console.log(`Fetching ${url}`);
      const response = await fetch(url, config);

      // Check if response is OK (status 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return { data, status: response.status };
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  // Auth endpoints with typed responses
  async signup(name: string, email: string, password: string) {
    interface SignupResponse {
      user: { id: string; name: string; email: string };
      token: string;
    }
    return this.customFetch<SignupResponse>("/users/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  }

  async login(email: string, password: string) {
    interface LoginResponse {
      user: { id: string; email: string };
      token: string;
    }
    return this.customFetch<LoginResponse>("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async getProfile() {
    interface ProfileResponse {
      id: string;
      name: string;
      email: string;
    }
    return this.customFetch<ProfileResponse>("/users/me");
  }
}

const apiClient = new ApiClient();
export default apiClient;