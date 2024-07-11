import { ReactNode } from "react";

export interface IError {
  message: string;
}

export interface IViewHeightContainer {
  children?: React.ReactNode | string;
  vh?: boolean;
  sx?: Object;
  center?: boolean;
  pt?: boolean;
}

export interface ICocktailDb {
  [key: string]: string;
  idDrink: string;
  strDrinkThumb: string;
  strDrink: string;
  strAlcoholic: string;
}

export interface ICocktailCustom {
  id: number;
  name: string;
  createdBy?: string;
  category: "Alcoholic" | "Non-alcoholic";
  ingredients: string[];
  instructions: string[];
}

export interface ICocktailUpload extends ICocktailCustom {
  image: File | null;
}

export interface ICocktailDownload extends ICocktailCustom {
  image_url: string;
}

export interface ICocktailCard {
  id: string;
  name: string;
  image: string;
  category?: string;
  db: string;
}

export interface IUser extends ILogin {
  bio: string;
}

export interface ILogin {
  id: number;
  email: string;
  password: string;
}

export interface ISignUp {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ISearchHook {
  id: string;
  dbType: "custom" | "apidb";
}

export interface IAuthState {
  user: {} | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null | undefined;
}
