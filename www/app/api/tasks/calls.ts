import {get, remove, patch,post} from "~/api";

export const getTasks = async () => {
    const data = await get('/tasks');
    const array = Object.entries(data);

    return array;
}
export const getTask = (id: number | string) => get(`/tasks`, id);
export const createTask = (data) => post('/tasks', data);
export const updateTask = (id: number | string, data) => patch(`/tasks`, id, data);
export const deleteTask = (id: number | string) => remove(`/tasks`, id);
