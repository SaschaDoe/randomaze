import { writable } from 'svelte/store';

export const selectedSystem = writable(null);
export const isSystemSelected = writable(false);