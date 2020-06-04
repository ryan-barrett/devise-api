export interface boardInput {
  input: Array<string>;
}

export interface UserInput {
  id?: string;
  userName: string;
  email: string;
}

export interface BoardInput {
  id?: string,
  name: string,
}

export interface graphqlConfig {
  schema: any;
  rootValue: any;
  graphql?: boolean;
}
