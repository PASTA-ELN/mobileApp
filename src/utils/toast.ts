import _toast from 'react-native-root-toast'

//
// Toast
// -----------------------------------------------------------------------------
// Toast is a simple wrapper around react-native-root-toast
//
export namespace Toast {
  //
  // Options
  //
  export type Options = {
    duration?: number,
    position?: number,
  }
  //
  // Show default toast
  //
  export function toast(message: string, options?: Options){
    _toast.show(message, {
      duration: options?.duration || 2000,
      position: options?.position || _toast.positions.TOP,
    })
    
  }
  //
  // Show error toast (red)
  //
  export function error(message: string, options?: Options){
    _toast.show(message, {
      duration: options?.duration || 2000,
      position: options?.position || _toast.positions.TOP,
      backgroundColor: '#ff0000',
    })
  }
  //
  // Show success toast (green)
  //
  export function success(message: string, options?: Options){
    _toast.show(message, {
      duration: options?.duration || 2000,
      position: options?.position || _toast.positions.TOP,
      backgroundColor: '#00ff00',
    })
  }
  //
  // Show info toast (blue)
  //
  export function info(message: string, options?: Options){
    _toast.show(message, {
      duration: options?.duration || 2000,
      position: options?.position || _toast.positions.TOP,
      backgroundColor: '#0000ff',
    })

  }
  //
  // Show warning toast (yellow)
  //
  export function warn(message: string, options?: Options){
    _toast.show(message, {
      duration: options?.duration || 2000,
      position: options?.position || _toast.positions.TOP,
      backgroundColor: '#ffff00',
    })
  }
}
