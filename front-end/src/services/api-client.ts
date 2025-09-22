import axios from "axios";


export class ApiClient {
    protected api: any;

    constructor(baseURL: string) {
        this.api = axios.create({
            baseURL,
            headers: { "Content-Type": "application/json" },
        });

        // Attach JWT automatically
        this.api.interceptors.request.use((config: any) => {
            const token = localStorage.getItem("token");
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }
}