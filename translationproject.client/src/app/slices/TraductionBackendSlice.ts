import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {Mutex} from "async-mutex";
import {logoutUser} from "./AuthSlice";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:5173/api/',
});

const baseQueryCheckAuth: BaseQueryFn<string | FetchArgs,
    unknown,
    FetchBaseQueryError> = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    console.log(result)
    if (result.error && result.error.status === 401) {
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            api.dispatch(logoutUser());
            release();
        }
    } else {
        // wait until the mutex is available without locking it
        await mutex.waitForUnlock();
    }

    return result;
};

export interface TranslationQueryParams {
    sourceLanguage: string;
    targetLanguages: string[];
    sourceText: string;
}

export interface TranslationResponse {
    detectedLanguage: {
        language: string,
        score: number
    } | null;
    translations: {
        text: string;
        to: string;
    }[]
}

export interface TranslationHistoryResponse {
    id: number;
    userId: string;
    sourceLanguage: string;
    targetLanguage: string;
    sourceText: string;
    translatedText: string;
    timestamp: string;
}

export interface WeatherForecast {
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

export const TraductionBackendApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryCheckAuth,
    tagTypes: ['translations'],
    endpoints(builder) {
        return {
            translation: builder.mutation<TranslationResponse, TranslationQueryParams>({
                query: (queryParams) => ({
                    url: 'Translation',
                    method: 'POST',
                    body: queryParams
                }),
                invalidatesTags: ['translations']
            }),
            translations: builder.query<TranslationHistoryResponse[], void>({
                query: () => ({
                    url: 'Translation',
                    method: 'GET',
                }),
                providesTags: ['translations']
            }),
            deleteHistory: builder.mutation({
                query: () => ({
                    url: 'Translation',
                    method: 'DELETE'
                }),
                invalidatesTags: ['translations']
            }),
            handleFavorite: builder.mutation<void, { translationId: number, isFavorite: boolean }>({
                query: (queryParams) => ({
                    url: `Translation/${queryParams.translationId}?isFavorite=${queryParams.isFavorite}`,
                    method: 'PUT',
                }),
                invalidatesTags: ['translations']
            }),
            weatherForecast: builder.query<WeatherForecast[], void>({
                query: () => ({
                    url: 'https://localhost:5173/WeatherForecast',
                    method: 'GET'
                })
            })
        }
    }
})

export const {
    useTranslationMutation,
    useTranslationsQuery,
    useDeleteHistoryMutation,
    useHandleFavoriteMutation,
    useWeatherForecastQuery
} = TraductionBackendApiSlice