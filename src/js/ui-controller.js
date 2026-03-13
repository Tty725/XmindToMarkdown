class UIController {
  constructor() {
    this.fileInput = document.getElementById('fileInput');
    this.selectFileBtn = document.getElementById('selectFileBtn');
    this.convertBtn = document.getElementById('convertBtn');
    this.fileInfo = document.getElementById('fileInfo');
    this.progressBar = document.getElementById('progressBar');
    this.progressText = document.getElementById('progressText');
    this.statusArea = document.getElementById('statusArea');
    this.statusMessage = document.getElementById('statusMessage');
    this.selectedFile = null;
    this.conversionManager = null;
  }

  setConversionManager(conversionManager) {
    this.conversionManager = conversionManager;
  }

  init() {
    this.selectFileBtn.addEventListener('click', () => {
      this.fileInput.click();
    });

    this.fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        this.selectedFile = e.target.files[0];
        this.showFileInfo(e.target.files[0].name);
        this.setConvertEnabled(true);
        
        if (this.conversionManager) {
          this.conversionManager.setSelectedFile(this.selectedFile);
        }
      }
    });
  }

  showFileInfo(filename) {
    this.fileInfo.textContent = `已选择：${filename}`;
    this.fileInfo.style.display = 'block';
  }

  updateProgress(percentage) {
    this.progressBar.style.width = `${percentage}%`;
    this.progressText.textContent = `${percentage}%`;
  }

  showStatus(message, type = 'info') {
    this.statusMessage.textContent = message;
    this.statusArea.style.display = 'block';
    
    this.statusArea.className = 'status-area';
    if (type === 'error') {
      this.statusArea.classList.add('error');
    } else if (type === 'success') {
      this.statusArea.classList.add('success');
    }
  }

  showError(message) {
    this.showStatus(message, 'error');
  }

  showSuccess(message) {
    this.showStatus(message, 'success');
  }

  reset() {
    this.fileInfo.style.display = 'none';
    this.updateProgress(0);
    this.statusArea.style.display = 'none';
    this.fileInput.value = '';
    this.selectedFile = null;
    this.setConvertEnabled(false);
  }

  setConvertEnabled(enabled) {
    this.convertBtn.disabled = !enabled;
  }
}
