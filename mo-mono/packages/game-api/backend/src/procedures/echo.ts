import { publicProcedure } from '../init.js';
import { EchoInputSchema, EchoOutputSchema } from ':mo-mono/game-api-schema';

export const echo = publicProcedure
  .input(EchoInputSchema)
  .output(EchoOutputSchema)
  .query((opts) => ({ result: opts.input.message }));
