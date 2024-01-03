export declare global {
  namespace NodeJS {
    interface ProcessEnv {
    }
  }
  
  var version: string;
  var build: string;
  var buildDate: string;
  var env: 'development' | 'production';
}
