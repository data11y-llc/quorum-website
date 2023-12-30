export class Calculations {
  // Calculates the size of compressed text
  public static compressedTextSize(compressedPoem: string): number {
    return Array.from(compressedPoem).length;
  }

  // Calculates the size of dictionary
  public static dictionarySize(dict: { [key: string]: { icon: string, value: string } }): number {
    const keys = Object.keys(dict);
    // Special case: if the dictionary only has one key with an empty value, count it as 0
    if (keys.length === 1 && dict[keys[0]].value === '') {
      return 0;
    }

    // Count characters properly considering emojis as one
    return keys.reduce((totalSize, key) => {
      return totalSize + Array.from(dict[key].icon).filter(char => char.trim() !== '').length
        + Array.from(dict[key].value).filter(char => char.trim() !== '').length;
    }, 0);
  }

  // Calculates the total size of compressed text and dictionary
  public static totalSize(compressedPoem: string, dict: { [key: string]: { icon: string, value: string } }): number {
    return this.compressedTextSize(compressedPoem) + this.dictionarySize(dict);
  }

  // Calculates the size of original text
  public static originalTextSize(originalPoem: string): number {
    return originalPoem.length;
  }

  // Calculates the compression percentage
  public static compressionPercentage(originalPoem: string, compressedPoem: string, dict: { [key: string]: { icon: string, value: string } }): number {
    const originalSize = this.originalTextSize(originalPoem);
    const newSize = this.totalSize(compressedPoem, dict);
    const compression = (1 - (newSize / originalSize)) * 100;

    return Math.round(compression * 100) / 100;
  }
}

