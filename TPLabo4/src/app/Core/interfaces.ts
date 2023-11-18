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
    exercise: string;
    description: string;
    repetitions: number;
    series: number;
    exerciseType: string;
    imageURL: string;
}


export enum Edays{
    lunes,
    martes,
    miercoles,
    jueves,
    viernes,
    sabado,
    domingo
}