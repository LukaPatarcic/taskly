import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useGetUsersQuery } from '~/api/users/query';
import { useFormContext } from 'react-hook-form';

export const UserSelect = () => {
  const { isLoading: isLoadingUsers, data: users } = useGetUsersQuery();
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="userId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>User</FormLabel>

          <Select
            disabled={isLoadingUsers}
            value={field.value || ''}
            onValueChange={field.onChange}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a verified email to display" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {users?.map(({ id, firstName, lastName }) => (
                <SelectItem key={id + firstName} value={String(id)}>
                  {firstName} {lastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
