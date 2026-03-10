class ConversionManager {
  constructor(fileHandler, xmindParser, markdownGenerator, resourceManager, zipPackager, uiController) {
    this.fileHandler = fileHandler;
    this.xmindParser = xmindParser;
    this.markdownGenerator = markdownGenerator;
    this.resourceManager = resourceManager;
    this.zipPackager = zipPackager;
    this.uiController = uiController;
    
    this.sheets = null;
    this.baseFilename = null;
    this.markdownFiles = null;
    this.selectedFile = null;
  }

  setSelectedFile(file) {
    this.selectedFile = file;
  }

  async convert() {
    try {
      const file = this.selectedFile || await this.fileHandler.selectFile();
      
      if (!file) {
        this.uiController.showError('请先选择XMind文件');
        return;
      }
      
      const validation = this.fileHandler.validateFile(file);
      if (!validation.valid) {
        this.uiController.showError(validation.error);
        return;
      }
      
      this.baseFilename = Utils.getBaseFilename(file.name);
      
      await this.parsePhase(file);
      await this.convertPhase();
      await this.packagePhase();
      
      this.uiController.showSuccess('转换完成！文件已自动下载。');
      
    } catch (error) {
      if (error.message !== '用户取消选择') {
        this.uiController.showError(error.message);
      }
    }
  }

  async parsePhase(file) {
    this.uiController.updateProgress(5);
    
    const data = await this.fileHandler.readFile(file);
    
    this.uiController.updateProgress(15);
    
    const { sheets, resources } = await this.xmindParser.parse(data);
    this.sheets = sheets;
    
    this.uiController.updateProgress(25);
    
    for (const [path, data] of resources) {
      this.resourceManager.addResource(path, data);
    }
    
    this.uiController.updateProgress(33);
  }

  async convertPhase() {
    this.uiController.updateProgress(40);
    
    this.markdownFiles = [];
    const resourceMap = this.resourceManager.getResourceMap();
    
    for (let i = 0; i < this.sheets.length; i++) {
      const sheet = this.sheets[i];
      const content = this.markdownGenerator.generate(sheet, resourceMap);
      
      const filename = this.sheets.length === 1 
        ? this.baseFilename + '.md'
        : `${this.baseFilename}_${i + 1}.md`;
      
      this.markdownFiles.push({ filename, content });
      
      const progress = 40 + Math.floor((i + 1) / this.sheets.length * 20);
      this.uiController.updateProgress(progress);
    }
    
    this.uiController.updateProgress(66);
  }

  async packagePhase() {
    this.uiController.updateProgress(70);
    
    const zipBlob = await this.zipPackager.package(
      this.baseFilename,
      this.markdownFiles,
      this.resourceManager.getAllResources()
    );
    
    this.uiController.updateProgress(90);
    
    this.zipPackager.download(zipBlob, this.baseFilename + '.zip');
    
    this.uiController.updateProgress(100);
    
    this.resourceManager.clear();
  }
}
