import {useMutation, useQuery} from "@tanstack/react-query";
import {getStatuses} from "~/api/statuses/calls";
import {getTasks} from "~/api/tasks/calls";

export const useGetTasks = () =>
    useQuery({
        queryFn: () => getTasks(),
        queryKey: ['tasks'],
    });
