import { HttpContextToken } from "@angular/common/http";

export const IS_NEED_AUTHORISATION = new HttpContextToken<boolean>(() => true);
