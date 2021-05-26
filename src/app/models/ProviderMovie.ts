export interface ProviderMovie {
    id?: number;
    results: {
        pays: {
            link?: URL;
            buy?: [];
            rent?: [];
            flatrate?: []
        }
    };
}
