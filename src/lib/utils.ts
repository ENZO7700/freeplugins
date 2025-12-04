import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes with clsx
 * Handles conditional classes and removes duplicates
 * 
 * @param inputs - Class values to merge (strings, arrays, objects)
 * @returns Merged and deduplicated class string
 * 
 * @example
 * ```ts
 * // Basic usage
 * cn('px-4 py-2', 'bg-blue-500')
 * // => 'px-4 py-2 bg-blue-500'
 * 
 * // Conditional classes
 * cn('px-4', isActive && 'bg-blue-500')
 * 
 * // Override classes (later classes take precedence)
 * cn('px-4 py-2', 'px-6')
 * // => 'py-2 px-6'
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
