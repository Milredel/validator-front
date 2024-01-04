import { Reasons } from "../interfaces/reasons.interface"
import { Line } from "./line.type"

export type ValidationResponseType = {
    statusCode: number,
    reasons?: Reasons,
    content?: Line[],
    message?: any
}