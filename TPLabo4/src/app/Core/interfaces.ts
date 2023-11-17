export interface Ipersona {
    id: number | null;
    nombre: string;
    apellido: string;
    edad: number | null;
    email: string;
    password: string;
    favouriteExercise: IfavouriteExercise[];
}


export interface IfavouriteExercise{
    exerciseID: number;
}


export interface Iexercise {
    id: number | null;
    excercise: string;
    description: string;
    repetitions: number;
    series: number;
    //ToDo agregar tipo de ejercicio
    //tipo de ejercicio tambien estaria muy bueno que sea un enum para manejar el filtro 
    exerciseType: string;
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