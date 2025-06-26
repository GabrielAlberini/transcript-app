import { z } from "zod";

export const transcriptionSchemaZod = z.object({
  content: z.string().min(3, "El contenido no puede estar vacío ni ser muy corto")
});
