import { ReactNode } from "react";

export interface ErrorInterface {
  message: string;
}

export interface ViewHeightContainerInterface {
  children?: React.ReactNode | string;
  vh?: boolean;
  sx?: Object;
  center?: boolean;
  pt?: boolean;
}

export interface CocktailCardInterface {
  id: string;
  img: string;
  name?: string;
  category?: string;
  db: string;
  createdBy?: string;
}

export interface CocktailDbInterface {
  [key: string]: string;
  idDrink: string;
  strDrinkThumb: string;
  strDrink: string;
  strAlcoholic: string;
}

export interface CocktailCustomInterface {
  id: number;
  name: string;
  category: "Alcoholic" | "Non-alcoholic";
  ingredients: string[];
  instructions: string[];
  img: File | undefined | string;
}

export interface UserInterface extends LoginInterface {
  bio: string;
}

export interface LoginInterface {
  id: number;
  email: string;
  password: string;
}

export interface SignUpInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SearchHookInterface {
  id: string;
  dbType: "custom" | "apidb";
}

export interface AuthState {
  user: {} | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null | undefined;
}
