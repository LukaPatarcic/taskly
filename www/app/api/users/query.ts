import {useQuery} from "@tanstack/react-query";
import {getUsers} from "~/api/users/calls";

export const useGetUsersQuery = () =>
    useQuery({
        queryFn: () => getUsers(),
        queryKey: ['users'],
    });
