export interface Iuser{
    id: number | null;
    email: string;
    password: string;
    favouriteExcercise: IfavouriteExcercise[];
}


export interface IfavouriteExcercise{
    id: number | null;
    excerciseID: number;
    isFavourite: boolean;
}

export interface Iexcercise {
    id: number | null;
    excercise: string;
    description: string;
    repetitions: number;
    series: number;
    //ToDo agregar tipo de ejercicio
    //tipo de ejercicio tambien estaria muy bueno que sea un enum para manejar el filtro 
    excerciseType: string;
}

//ToDo agregar enums
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