// https://api.insee.fr/catalogue/site/themes/wso2/subthemes/insee/pages/item-info.jag?name=BDM&version=V1&provider=insee#/
const config = {
    apiKey: import.meta.env.VITE_BDM_API_KEY,
    baseURL: import.meta.env.VITE_BDM_BASE_URL,
};

export default config;