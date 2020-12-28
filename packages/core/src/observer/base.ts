export class BaseObserver<T extends (...args: any[]) => any> {
  protected _listeners: T[] = [];

  public subscribe(listener: T) {
    this._listeners.push(listener);

    return () => {
      this.unsubscribe(listener);
    };
  }

  public unsubscribe(listener: T) {
    const index = this._listeners.indexOf(listener);
    if (index === -1) {
      return;
    }

    this._listeners.splice(index, 1);
  }

  notify(...args: Parameters<T>) {
    this._listeners.forEach((listener) => listener(...args));
  }
}
