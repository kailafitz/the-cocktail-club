import { AlertColor } from "@mui/material/Alert";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface ILogo {
  className?: string;
}

export interface IProtectedRoute {
  children?: ReactNode;
}

export interface IFormFeedbackProps {
  severity: AlertColor | undefined;
  message: string;
  mb?: boolean;
}

export interface ILoading {
  color: "light" | "dark";
}

export interface IError {
  message: string;
}

export interface IDeleteCocktail {
  cocktailId: string;
}

export interface ILogout {
  onClick: Dispatch<SetStateAction<boolean>>;
}

export interface ISearchBy {
  searchBy: (data: IApiCocktail[]) => void;
}

export interface IViewHeightContainer {
  children?: React.ReactNode | string;
  vh?: boolean;
  sx?: Object;
  center?: boolean;
  pt?: boolean;
}

export interface IApiCocktail {
  [key: string]: string;
  idDrink: string;
  strDrinkThumb: string;
  strDrink: string;
  strAlcoholic: string;
}

export interface ICustomCocktailBase {
  name: string;
  createdBy?: string;
  category: "Alcoholic" | "Non-alcoholic";
  ingredients: string[];
  instructions: string[];
  imageName: string;
}

export interface ICustomCocktailUpload extends ICustomCocktailBase {
  imageFile?: File | null;
}

export interface ICustomCocktailDownload extends ICustomCocktailBase {
  id: number;
  image_url: string;
}

export interface ICocktailCard {
  id: string;
  name: string;
  image_url: string;
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

export interface ISearchBar {
  searchMethod: string;
}

export interface IAuthState {
  user: {} | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null | undefined;
}
