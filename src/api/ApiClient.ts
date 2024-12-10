import { CardItemDTO } from "@/Entities/CardItemDTO";
import { CardItemType, CardType, RecivedCardDataType } from "@/Types/CardType";
import { RecivedCardDataAdminType } from "@/Types/CardTypeAdmin";
import { SearchItemShortType } from "@/Types/SearchItemShortType";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export type AuthorizationType = {userName: string, password: string}

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
        // this.sessionToken = localStorage.getItem("sessionToken") ?? null; //TODO: с этой строчкой потом можно добавить запоминание сессии
        this.sessionToken = null;
    }
    
    async Login({ userName, password }: AuthorizationType): Promise<AxiosResponse<unknown, unknown>> {
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

    async Register({userName, password}: AuthorizationType) {
        const response = await this.authClient.post("api/Autorization/register", {
            Username: userName,
            PasswordHash: password
        })
        return response.data;
    }

    async GetItems(skip: number, take: number, category: string = "", brand: string = "") {
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

    async GetItemsAdmin(skip: number, take: number, category: string = "", brand: string = "") {
        const response = await this.client.get<RecivedCardDataAdminType>(
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

    async GetPopularItems() {
        const response = await this.client.get<(CardType)[]>("https://localhost:7280/api/ItemsPostgre/GetPopularItems");
        return response.data;
    }

    async GetItemsCostil(skip: number, take: number, category: string = "") {
        const response = await this.client.get<RecivedCardDataType>(`https://localhost:7280/api/ItemsPostgre/GetItems?skip=${skip}&take=${take}&${category}`);
        return response.data;
    }

    async GetSearchItems(tag: string) {
        const response = await this.client.post<SearchItemShortType[]>(`https://localhost:7280/api/ItemsPostgre/GetItemByName?name=${tag}`)
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

    async AddItem(item: Omit<CardItemDTO, "id">) {
        const response = await this.authClient.post("https://localhost:7280/api/ItemsPostgre/CreateItem", item);
        return response.data;
    }

    async UpdateItem(item: CardItemDTO) {
        const response = await this.authClient.post("https://localhost:7280/api/ItemsPostgre/ChangeItem", item);
        return response.data;
    }

    async DeleteItem(id: number) {
        const response = await this.authClient.delete(`https://localhost:7280/api/ItemsPostgre/DeleteItem/${id}`)
        return response.data;
    }

    async UpdatePhoto(formData: FormData) {
        const response = await this.authClient.postForm("https://localhost:7280/api/ItemsPostgre/updatePhoto", formData);
        return response.data;
    }

    async GetBrands() {
        const response = await this.client.get("https://localhost:7280/api/ItemsPostgre/GetBrands")
        return response.data;
    }

    async GetCategories() {
        const response = await this.client.get("https://localhost:7280/api/ItemsPostgre/GetCategories")
        return response.data;
    }
}

export const apiClient = new ApiClient;