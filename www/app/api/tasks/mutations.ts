import { useMutation } from "@tanstack/react-query";
import { post } from "~/api/common";

export const useCreateTaskMutation = () =>
    useMutation<void, any, any>({
        mutationFn: (task) => post('/tasks', task),
        mutationKey: ['task'],
    });
