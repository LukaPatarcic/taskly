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
import { useGetStatusesQuery } from '~/api/statuses/query';
import { useFormContext } from 'react-hook-form';

export const StatusSelect = () => {
  const { isLoading: isLoadingStatuses, data: statuses } =
    useGetStatusesQuery();
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="statusId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Status</FormLabel>
          <Select
            disabled={isLoadingStatuses}
            value={field.value || ''}
            onValueChange={field.onChange}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a task status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {statuses?.map(({ id, label }) => (
                <SelectItem key={id} value={String(id)}>
                  {label}
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
