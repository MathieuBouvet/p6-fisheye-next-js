function getInitials(...args: (string | undefined)[]): string {
  return args
    .flatMap(arg => {
      if (arg == null) {
        return "";
      }
      return arg.charAt(0);
    })
    .join("");
}

export default getInitials;
