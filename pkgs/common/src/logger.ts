export type LoggerConfig = {
  space: string | number | undefined;
};

export class Logger {
  public constructor(private config: LoggerConfig) {}
  public json(data: unknown) {
    if (typeof data === "string") {
      console.log(data);
      return;
    }
    console.log(this.toLogJson(data));
  }
  private toLogJson(data: unknown) {
    const replacer =
      data instanceof Error ? Object.getOwnPropertyNames(data) : undefined;
    return JSON.stringify(data, replacer, this.config.space);
  }
}
