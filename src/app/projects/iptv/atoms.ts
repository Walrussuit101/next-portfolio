import { atom } from "jotai";
import { Alert } from "../../../types";

export const alertsAtom = atom<Alert[]>([]);