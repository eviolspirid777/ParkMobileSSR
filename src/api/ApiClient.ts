import { CardItemDTO } from "@/Entities/CardItemDTO";
import { CardItemType, CardType, RecivedCardDataType } from "@/Types/CardType";
import { RecivedCardDataAdminType } from "@/Types/CardTypeAdmin";
import { SearchItemsResponseType } from "@/Types/SearchItemShortType";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export type AuthorizationType = {userName: string, password: string}

// const AUTORIZATIONS_PATH = 'https://localhost:7280/api/Autorization'
// const POSTGRE_ITEMS_PATH = "https://localhost:7280/api/ItemsPostgre"
const AUTORIZATIONS_PATH = "http://aspnet-api/api/Autorization";
const POSTGRE_ITEMS_PATH = "http://aspnet-api/api/ItemsPostgre"


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
        const response = await this.authClient.post(`${AUTORIZATIONS_PATH}/Autorization/register`, {
            Username: userName,
            PasswordHash: password
        })
        return response.data;
    }

    async GetItems(skip: number, take: number, category: string = "", brand: string = "") {
        const response = await this.client.get<RecivedCardDataType>(
            `${POSTGRE_ITEMS_PATH}/ItemsPostgre/GetItems`, {
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
            `${POSTGRE_ITEMS_PATH}/ItemsPostgre/GetItems`, {
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
        const response = await this.client.get<(CardType)[]>(`${POSTGRE_ITEMS_PATH}/ItemsPostgre/GetPopularItems`);
        return response.data;
    }

    async GetItemsCostil(skip: number, take: number, category: string = "") {
        const response = await this.client.get<RecivedCardDataType>(`${POSTGRE_ITEMS_PATH}/ItemsPostgre/GetItems?skip=${skip}&take=${take}&${category}`);
        return response.data;
    }

    async GetSearchItems(tag: string, skip: number, take: number) {
        const response = await this.client.post<SearchItemsResponseType>(`${POSTGRE_ITEMS_PATH}/ItemsPostgre/GetItemsByName?skip=${skip}&take=${take}&name=${tag}`)
        return response.data;
    }

    async GetItem(id: number) {
        const response = await this.client.post<CardItemType>(
            `${POSTGRE_ITEMS_PATH}/ItemsPostgre/GetItem/${id}`
        );
        return response.data;
    }

    async PostCall(number: string) {
        const response = await this.client.post(`${POSTGRE_ITEMS_PATH}/ItemsPostgre/TelephoneCall/${number}`)
        return response.data;
    }

    async OrderData(values: object) {
        const response = await this.authClient.post(`${POSTGRE_ITEMS_PATH}/ItemsPostgre/orderData`, values)
        return response.data
    }

    async AddItem(item: Omit<CardItemDTO, "id">) {
        const response = await this.authClient.post(`${POSTGRE_ITEMS_PATH}/ItemsPostgre/CreateItem`, item);
        return response.data;
    }

    async UpdateItem(item: CardItemDTO) {
        const response = await this.authClient.post(`${POSTGRE_ITEMS_PATH}/ItemsPostgre/ChangeItem`, item);
        return response.data;
    }

    async DeleteItem(id: number) {
        const response = await this.authClient.delete(`${POSTGRE_ITEMS_PATH}/ItemsPostgre/DeleteItem/${id}`)
        return response.data;
    }

    async UpdatePhoto(formData: FormData) {
        const response = await this.authClient.postForm(`${POSTGRE_ITEMS_PATH}/ItemsPostgre/updatePhoto`, formData);
        return response.data;
    }

    async GetBrands() {
        const response = await this.client.get(`${POSTGRE_ITEMS_PATH}/ItemsPostgre/GetBrands`)
        return response.data;
    }

    async PostBrand(name: string) {
        const response = await this.client.post(`${POSTGRE_ITEMS_PATH}/ItemsPostgre/CreateBrand`, {name})
        return response.data
    }

    async GetCategories() {
        const response = await this.client.get(`${POSTGRE_ITEMS_PATH}/ItemsPostgre/GetCategories`)
        return response.data;
    }

    async PostCategory(name: string) {
        const response = await this.client.post(`${POSTGRE_ITEMS_PATH}/ItemsPostgre/CreateCategory`, {name})
        return response.data
    }
}

export const apiClient = new ApiClient;