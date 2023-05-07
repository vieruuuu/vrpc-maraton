export function findInMap<K, V>(
  m: Map<K, V>,
  findFn: (value: V, key: K) => boolean
): V | undefined {
  for (const [key, value] of m) {
    if (findFn(value, key)) {
      return value;
    }
  }

  return undefined;
}

export function filterMap<K, V>(
  m: Map<K, V>,
  filterFn: (value: V, key: K) => boolean
): Map<K, V> {
  const result = new Map<K, V>();

  for (const [key, value] of m) {
    if (filterFn(value, key)) {
      result.set(key, value);
    }
  }

  return result;
}

/**
 * returns the first value from m
 */
export function firstFromMap<K, V>(m: Map<K, V>): V | undefined {
  return m.values().next().value;
}

export function extractFromMap<K, V>(m: Map<K, V>, keys: K[]): Map<K, V> {
  const extracted = new Map<K, V>();

  for (const key of keys) {
    const value = m.get(key);

    if (value) {
      extracted.set(key, value);
    }
  }

  return extracted;
}

export function extractArrayFromMap<K, V>(m: Map<K, V>, keys: K[]): V[] {
  const extracted: V[] = [];

  for (const key of keys) {
    const value = m.get(key);

    if (value) {
      extracted.push(value);
    }
  }

  return extracted;
}

export function mergeMaps<K, V>(...maps: Map<K, V>[]): Map<K, V> {
  const result = new Map<K, V>();

  for (const m of maps) {
    for (const [key, value] of m) {
      result.set(key, value);
    }
  }

  return result;
}

export function transformMap<K, V, NewV>(
  m: Map<K, V>,
  transformFn: (value: V, key: K) => NewV
): Map<K, NewV> {
  const result = new Map<K, NewV>();

  for (const [key, value] of m) {
    result.set(key, transformFn(value, key));
  }

  return result;
}

export function transformMapToArray<K, V, NewV>(
  m: Map<K, V>,
  transformFn: (value: V, key: K) => NewV
): NewV[] {
  const result: NewV[] = [];

  for (const [key, value] of m) {
    result.push(transformFn(value, key));
  }

  return result;
}

export function sortMap<K, V>(
  m: Map<K, V>,
  sortFn: (a: V, b: V) => number
): Map<K, V> {
  const sortedMap = new Map<K, V>();

  const sortedMapAsArray = [...m.entries()];

  sortedMapAsArray.sort((a, b) => sortFn(a[1], b[1]));

  for (const [key, value] of sortedMapAsArray) {
    sortedMap.set(key, value);
  }

  return sortedMap;
}
