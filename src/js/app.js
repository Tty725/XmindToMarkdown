document.addEventListener('DOMContentLoaded', () => {
  const fileHandler = new FileHandler();
  const xmindParser = new XMindParser();
  const markdownGenerator = new MarkdownGenerator();
  const resourceManager = new ResourceManager();
  const zipPackager = new ZipPackager();
  const uiController = new UIController();
  
  const conversionManager = new ConversionManager(
    fileHandler,
    xmindParser,
    markdownGenerator,
    resourceManager,
    zipPackager,
    uiController
  );
  
  uiController.setConversionManager(conversionManager);
  uiController.init();
  
  const convertBtn = document.getElementById('convertBtn');
  convertBtn.addEventListener('click', () => {
    conversionManager.convert();
  });
});
