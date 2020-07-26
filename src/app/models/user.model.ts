export class User {
  _id: string;
  admin: boolean;
  email: string;
  name: string;
  iat: number;
  exp: number
}

export class UserPayload {
  email: string;
  password: string;
  name?: string
}
