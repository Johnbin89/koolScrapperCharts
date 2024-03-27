import useSWR from "swr";

const useFetchSWR = (url: string) => {

    const fetcher = async (url: string) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('An error occurred while fetching the data.');
        }
        return response.json();
    };

    const { data, ...restSWR } = useSWR(
        url,
        fetcher
    );

    return { data, ...restSWR };
};

export default useFetchSWR;