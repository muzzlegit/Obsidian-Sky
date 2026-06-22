import { createTransport } from './core/transport';
import type { AppRouter } from './core/transport.types';

export const transport = createTransport<AppRouter>();
