import { AsgardeoSPAClient, HttpError, HttpRequestConfig, HttpResponse } from "@asgardeo/auth-react";

const auth = AsgardeoSPAClient.getInstance();
export const getTime = (region: string): Promise<string> | undefined => {
    const url: string = `${process.env.REACT_APP_API_ENDPOINT}/get-time`;

    const requestConfig: HttpRequestConfig = {
        url,
        method: "GET",
        params: {
            region
        }
    };

    return auth
        ?.httpRequest(requestConfig)
        .then((response: HttpResponse | undefined) => {
            return Promise.resolve(response?.data);
        })
        .catch((error: HttpError) => {
            return Promise.reject(error);
        });
};
