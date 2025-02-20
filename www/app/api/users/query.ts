import {useQuery} from "@tanstack/react-query";
import {getUsers} from "~/api/users/calls";
import {CACHE_KEYS} from "~/api";

export const useGetUsersQuery = () =>
    useQuery({
        queryFn: () => getUsers(),
        queryKey: [CACHE_KEYS.USERS],
    });
