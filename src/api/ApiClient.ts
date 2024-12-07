import { CardItemDTO } from "@/Entities/CardItemDTO";
import { CardItemType, RecivedCardDataType } from "@/Types/CardType";
import axios, { AxiosInstance, AxiosResponse } from "axios";


const AUTORIZATIONS_PATH = 'https://localhost:7280/api/Autorization'

class ApiClient {
    client: AxiosInstance;
    authClient: AxiosInstance;
    sessionToken: string | null;

    constructor() {
        this.client = axios.create({
            headers: {
                "Content-Type": "application/json"
            },
        });
        this.authClient = axios.create()
        this.sessionToken = null;
    }
    
    async Login({ userName, password }: { userName: string, password: string }): Promise<AxiosResponse<unknown, unknown>> {
        try {
            const loginResponse = await this.authClient.post(`${AUTORIZATIONS_PATH}/login`, {
                Username: userName,
                Password: password
            })
            
            if (loginResponse.status && loginResponse.data) {
                this.sessionToken = loginResponse.data;
                this.authClient.defaults.headers.common["Authorization"] = `Bearer ${this.sessionToken}`
            }
            return loginResponse;
        }
        catch (error) {
            throw error;
        }
    }

    Logout() {
        this.authClient.defaults.headers.common["Authorization"] = null;
        this.sessionToken = null;
        localStorage.setItem("sessionToken", "");
    }

    async Register({userName, password}: {userName: string, password: string}) {
        const response = await this.authClient.post("api/Autorization/register", {
            Username: userName,
            PasswordHash: password
        })
        return response.data;
    }

    async GetItems(skip: number,take: number,category?: string, brand?: string) {
        const response = await this.client.get<RecivedCardDataType>(
            `https://localhost:7280/api/ItemsPostgre/GetItems`, {
                params: {
                    skip: skip,
                    take: take,
                    category: category,
                    brand: brand
                }
            });
        return response.data;
    }

    async GetItem(id: number) {
        const response = await this.client.post<CardItemType>(
            `https://localhost:7280/api/ItemsPostgre/GetItem/${id}`
        );
        return response.data;
    }

    async OrderData(values: object) {
        const response = await this.authClient.post("https://localhost:7280/api/ItemsPostgre/orderData", values)
        return response.data
    }

    async UpdateItem(item: CardItemDTO) {
        const response = await this.authClient.post("https://localhost:7280/api/ItemsPostgre/ChangeItem", item);
        return response.data;
    }
}

export const apiClient = new ApiClient;