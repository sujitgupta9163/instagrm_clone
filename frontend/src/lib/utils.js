import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
export const readFileAsDataURL = (file)=>{
  return new Promise((resolve)=>{
    const reander = new FileReader();
    reander.onloadend =()=>{
      if(typeof reander.result ==='string'){
        resolve(reander.result);
      }
    }
    reander.readAsDataURL(file);
  })
}