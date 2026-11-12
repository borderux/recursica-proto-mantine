import { setupWorker } from "msw/browser";
import { apiHandlers } from "./index";

/**
 * The MSW browser worker serving every registered mock API. Started in
 * `main.tsx` before the app renders — see `enableMocking()` there.
 */
export const worker = setupWorker(...apiHandlers);
