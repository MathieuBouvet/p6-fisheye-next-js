export abstract class ImageDeleter {
  public abstract delete(path: string): Promise<void>;
}
