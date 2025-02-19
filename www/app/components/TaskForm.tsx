'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "~/components/ui/dialog";
import {Button} from "~/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Input} from "~/components/ui/input";
import {Textarea} from "~/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useGetStatusesQuery} from "~/api/statuses/query";
import {useGetUsersQuery} from "~/api/users/query";
import {useCreateTaskMutation} from "~/api/tasks/mutations";
import { Loader2 } from "lucide-react"

const formSchema = z.object({
    title: z.string({ message: 'Please enter a title' }),
    description: z.string({ message: 'Please enter a description' }),
    statusId: z.string({ message: 'Please select a status' }),
    userId: z.string({ message: 'Please select a user' }),
})

export const TaskForm = () => {
    const { isLoading: isLoadingStatuses, data: statuses} = useGetStatusesQuery();
    const { isLoading: isLoadingUsers, data: users} = useGetUsersQuery();
    const { mutateAsync, isPending } = useCreateTaskMutation();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            statusId: undefined,
            userId: undefined,
        }
    })

    function onSubmit(task: z.infer<typeof formSchema>) {
        mutateAsync(task).then(() => {
            form.reset();
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <Dialog onOpenChange={console.log}>
            <DialogTrigger asChild><Button>Create Task</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Let's create your task</DialogTitle>
                    <DialogDescription>
                        Fill in the form below to create a new task.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter you title..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field}) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter you description..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="statusId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                        disabled={isLoadingStatuses}
                                        onValueChange={field.onChange}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a task status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {statuses?.map(({ id, label }) => (
                                                <SelectItem key={id} value={id}>{label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="userId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User</FormLabel>

                                    <Select disabled={isLoadingUsers} onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {users?.map(({ id, firstName, lastName}) => (
                                                <SelectItem key={id+firstName} value={id}>{firstName} {lastName}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit" disabled={isPending}>
                            {isPending &&  <Loader2 className="animate-spin" />}
                            Submit
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
