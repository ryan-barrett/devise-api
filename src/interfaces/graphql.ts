export interface boardInput {
  input: Array<string>;
}

export interface UserInput {
  id?: string;
  userName: string;
  email: string;
}

export interface graphqlConfig {
  schema: any;
  rootValue: any;
  graphql?: boolean;
}
