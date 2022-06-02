const httpMethods = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
  "OPTIONS",
  "HEAD",
] as const;

function isValidHttpMethod(
  method: string | undefined
): method is typeof httpMethods[number] {
  if (method == null) {
    return false;
  }
  return (httpMethods as readonly string[]).includes(method);
}

export default isValidHttpMethod;
