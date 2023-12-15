import _toast, { Positions } from 'react-native-root-toast'

export namespace Toast {

  export type Options = {
    duration?: number,
    position?: number,
  }

  export function toast(message: string, options?: Options){
    _toast.show(message, {
      duration: options?.duration || 2000,
      position: options?.position || _toast.positions.TOP,
    })
    
  }

  export function error(message: string, options?: Options){
    _toast.show(message, {
      duration: options?.duration || 2000,
      position: options?.position || _toast.positions.TOP,
      backgroundColor: '#ff0000',
    })
  }

  export function success(message: string, options?: Options){
    _toast.show(message, {
      duration: options?.duration || 2000,
      position: options?.position || _toast.positions.TOP,
      backgroundColor: '#00ff00',
    })
  }

  export function info(message: string, options?: Options){
    _toast.show(message, {
      duration: options?.duration || 2000,
      position: options?.position || _toast.positions.TOP,
      backgroundColor: '#0000ff',
    })

  }
  export function warn(message: string, options?: Options){
    _toast.show(message, {
      duration: options?.duration || 2000,
      position: options?.position || _toast.positions.TOP,
      backgroundColor: '#ffff00',
    })
  }

}