import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Feature } from "../models/feature";

export const overlaysApi = createApi({
	reducerPath: "overlaysApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
	endpoints: builder => ({
		union: builder.mutation<Feature, Feature>({
			query: (body) => ({
				url: "union",
				method: "POST",
				body: {
					featureCollection: body,
				},
			}),
		}),
		intersect: builder.mutation<Feature, Feature>({
			query: (body) => ({
				url: "intersect",
				method: "POST",
				body: {
					featureCollection: body,
				},
			}),
		}),
	}),
});

export const {
	useUnionMutation,
	useIntersectMutation,
} = overlaysApi;