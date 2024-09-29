import { githubFetcher } from "@/lib/fetcher";
import { GetUserRepo } from "@/types/get-user-repo";
import { AxiosError } from "axios";
import useSWR from 'swr'

const me = 'michalmilek'

export const useGetRepoList = () => {
    const query = useSWR<GetUserRepo[], AxiosError>(`/users/${me}/repos`, githubFetcher)

    return query
};
