// lib/types/user.types.ts

export type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  photo: string;
  firstName?: string;
  lastName?: string;
  creditBalance: number;
  planId?: number;
};

export type UpdateUserParams = Partial<Omit<CreateUserParams, "clerkId">>;

