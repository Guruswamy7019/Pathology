export type Nullable<T> = T | null;

export type Patient = {
    id: string;
    name: string;
    age: number;
    gender: string;
    code: string;
};

export type AuthorizationItem = {
    id: string;
    date: string;
    time: string;
    patient: Patient;
    patientType: "Walk-In" | "Registered";
    doctorName: string;
    billId: string;
    orders: number;
};
