/**
 * Properly encodes image URLs to handle special characters like spaces and + signs
 * @param path - The image path to encode
 * @returns The properly encoded URL
 */
export function encodeImageUrl(path: string): string {
  if (!path) return path
  
  // Split the path into segments to preserve the forward slashes
  const segments = path.split('/')
  
  // Encode each segment individually, then join back with /
  const encoded = segments.map(segment => {
    // Replace + with %2B and encode other characters
    return encodeURIComponent(segment)
  }).join('/')
  
  return encoded
}

