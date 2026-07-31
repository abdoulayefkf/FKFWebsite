import { z } from "zod";
export const strongPassword = z.string().min(12).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[^A-Za-z0-9]/);
export const createUserSchema = z.object({
  firstName: z.string().trim().min(1).max(80), lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().toLowerCase().email(), phone: z.string().trim().max(30).optional().nullable(),
  role: z.enum(["OWNER", "ADMINISTRATOR", "EDITOR"]), temporaryPassword: strongPassword,
  profilePhoto: z.string().url().optional().nullable(),
});
export const updateUserSchema = createUserSchema.omit({ temporaryPassword: true }).partial();
