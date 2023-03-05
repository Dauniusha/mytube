import { SetMetadata } from "@nestjs/common";
import { PUBLIC_ENDPOINT } from "../../../constants/auth.constant";

export const Public = () => SetMetadata(PUBLIC_ENDPOINT, true);
