declare interface Obj { [key: string]: any; }

declare interface ObjStr { [key: string]: string; }

declare type Func = (...args: any[]) => any;

declare interface UserData {
  user?: {
    [key: string]: any,
    address?: Obj,
  },
  profile?: {
    [key: string]: any,
    address?: Obj,
  },
}

declare interface TempZone {
  [key: number]: {
    mode?: string; /* for signin page */
    nextPage?: string;
    warning?: Obj;
    data: UserData;
    errTips?: Obj;
    dump?: Obj;
    accreditedSelected?: boolean; /* for investor_profile page */
  };
}

declare type RootState = {
  setting: Obj;
  userData: UserData;
  tempZone: TempZone;
}

declare type Dispatch = (Obj: Obj) => any;

declare interface Actions { [key: string]: Func }


