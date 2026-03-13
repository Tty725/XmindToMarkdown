class ResourceManager {
  constructor() {
    this.resources = new Map();
    this.filenameSet = new Set();
    this.resourceMap = new Map();
  }

  addResource(originalPath, data) {
    const cleanPath = originalPath.replace(/^xap:/, '');
    const filename = cleanPath.split('/').pop();
    
    let processedFilename = filename;
    
    if (this.filenameSet.has(filename)) {
      const ext = Utils.getFileExtension(filename);
      processedFilename = Utils.generateUUID() + '.' + ext;
    }
    
    this.resources.set(cleanPath, {
      originalPath: cleanPath,
      filename: processedFilename,
      data: data
    });
    
    this.filenameSet.add(processedFilename);
    this.resourceMap.set(cleanPath, processedFilename);
    
    return processedFilename;
  }

  getResourceMap() {
    return this.resourceMap;
  }

  getAllResources() {
    return Array.from(this.resources.values());
  }

  clear() {
    this.resources.clear();
    this.filenameSet.clear();
    this.resourceMap.clear();
  }
}
