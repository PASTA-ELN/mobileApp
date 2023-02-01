import { dispatch } from "./store";
import { log } from './store/reducer/Log'

export class Logger{

  // TODO make logger use different redux elements

  constructor(
    public entryName: string
  ){
    
  }

  //
  // Logging Methods
  //
  error(...args: any[]){
    this.#_log_('error', ...args);
  }
  info(...args: any[]){
    this.#_log_('info', ...args);
  }
  log(...args: any[]){
    this.#_log_('log', ...args);
  }
  warn(...args: any[]){
    this.#_log_('warn', ...args);
  }

  //
  // Unsafe area
  //

  #_log_ = (state: 'error'|'info'|'log'|'warn', ...args : any[]) => {
    //TODO format string
    let message: string = ''

    dispatch(log({state: 'log', message}));
  }
}
