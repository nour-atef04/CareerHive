export function formatTextWithLinks(text) {
  if (!text) return null;

  // Regex to detect URLs (starting with http://, https://, or www.)
  const urlRegex = /((?:https?:\/\/|www\.)[^\s]+)/g;

  return text.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      // If the part is a URL, return an anchor tag
      // Ensure href starts with http/https
      const href = part.startsWith("www.") ? `http://${part}` : part;
      
      return (
        <a 
          key={index} 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: "var(--color-brand--2)", textDecoration: "underline" }} // styling
          onClick={(e) => e.stopPropagation()} // Stop post click event (navigation)
        >
          {part}
        </a>
      );
    }
    // Otherwise return the plain text
    return part;
  });
}