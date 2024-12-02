import { Employee } from "./employeeInterface";
import { Lines } from "./linesInterface";

export interface FullReceipt {
    orderId: number,
    registerId: number,
    empiId: number,
    recTime: string,
    freight: number,
    fpa: number,
    totalCost: number,
    paymentType: string,
    emp: Employee,
    receiptLines: Lines[],
}