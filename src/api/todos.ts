export type Todo = {
    id: string;
    title: string;
    completed: boolean;
};

export async function getTodos(): Promise<Todo[]> {
    return [
        {
            id: '97191edb-d498-4276-b0c4-13a6c6d472cb',
            title: 'Buy booze',
            completed: false,
        },
        {
            id: '589448d3-8422-4d4e-8e95-3afe421ed730',
            title: 'Mow lawn',
            completed: false,
        },
        {
            id: '4601af7e-fd80-4881-8cad-0631350061b8',
            title: 'Take shower',
            completed: false,
        },
    ];
}
