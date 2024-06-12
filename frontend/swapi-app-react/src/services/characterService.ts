import createHttpService, { HttpService } from "./http-service";

export interface Character {
  id: number;
  name: string;
}

const characterService = createHttpService() as HttpService;

export default characterService;