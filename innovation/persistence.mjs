import {KEY,seed,restore} from './model.mjs';
// Storage is injected so unavailable/quota-limited browsers follow the same path as tests.
export function load(storage){
 try{const raw=storage.getItem(KEY);const value=raw?restore(raw):seed();return {value:value||seed(),message:raw&&!value?'Saved prototype data could not be restored. The sample scenario has been loaded.':'',storage:true};}
 catch{return {value:seed(),message:'Browser storage is unavailable. This session remains usable; export decisions to keep them.',storage:false};}
}
export function save(storage,value){try{storage.setItem(KEY,JSON.stringify(value));return true;}catch{return false;}}
export function reset(storage){const value=seed();return {value,storage:save(storage,value)};}
