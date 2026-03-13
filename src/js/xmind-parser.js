class XMindParser {
  constructor() {
    this.jszip = null;
  }

  async parse(data) {
    this.jszip = new JSZip();
    
    try {
      const zip = await this.jszip.loadAsync(data);
      
      const contentFile = zip.file('content.json');
      if (!contentFile) {
        throw new Error('content.json not found');
      }
      
      const contentText = await contentFile.async('string');
      const sheets = this.parseContent(contentText);
      
      const resources = await this.extractResources(zip);
      
      return { sheets, resources };
    } catch (error) {
      throw new Error('文件格式错误，请确认是否能在XMind软件中打开。');
    }
  }

  parseContent(content) {
    try {
      const data = JSON.parse(content);
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid content format');
      }
      
      return data.map(sheet => ({
        id: sheet.id,
        title: sheet.title,
        rootTopic: sheet.rootTopic
      }));
    } catch (error) {
      throw new Error('content.json格式错误');
    }
  }

  async extractResources(zip) {
    const resources = new Map();
    
    const files = Object.keys(zip.files);
    
    for (const filepath of files) {
      if (filepath.startsWith('resources/') && !filepath.endsWith('/')) {
        const file = zip.files[filepath];
        const data = await file.async('arraybuffer');
        resources.set(filepath, data);
      }
    }
    
    return resources;
  }
}
