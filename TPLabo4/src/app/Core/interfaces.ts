export interface Iuser{
    id: number | null;
    email: string;
    password: string;
}


export interface Iroutine{
    id: number | null;
    days: Edays;
}

export interface Iexcercise {
    id: number | null;
    excercise: string;
    description: string;
    repetitions: number;
    series: number;
    //tipo de ejercicio tambien estaria muy bueno que sea un enum para manejar el filtro 
    excerciseType: string;
}


//Estaria muy bueno que los dias los pueda manejar con enums para filtrar la info
export enum Edays{
    lunes,
    martes,
    miercoles,
    jueves,
    viernes,
    sabado,
    domingo
}