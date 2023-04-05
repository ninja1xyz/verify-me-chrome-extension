declare namespace chrome {
  namespace storage {
    interface StorageArea {
      get: (
        keys: string | string[] | null,
        callback: (items: { [key: string]: any }) => void
      ) => void;
      set: (items: { [key: string]: any }, callback?: () => void) => void;
      remove: (keys: string | string[], callback?: () => void) => void;
    }
    const local: StorageArea;
  }
}
