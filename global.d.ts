import { Logger } from "./src/Logger";

declare global{
  namespace NodeJS{
    interface ProcessEnv{

    };
  };

  readonly var version;
}
