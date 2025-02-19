import {useMutation, useQuery} from "@tanstack/react-query";
import {getStatuses} from "~/api/statuses/calls";

export const useGetStatusesQuery = () =>
    useQuery({
        queryFn: () => getStatuses(),
        queryKey: ['statuses'],
    });


// export const useEditProfileMutation = () =>
//     useMutation<void, DefaultError, EditProfileRequest>({
//         mutationFn: (profile) => post('/establishment/v1/profile', profile),
//         mutationKey: ['/establishment/v1/profile'],
//     });
