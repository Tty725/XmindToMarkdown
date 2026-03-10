class FileHandler {
  constructor() {
    this.MAX_FILE_SIZE = 50 * 1024 * 1024;
  }

  async selectFile() {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.xmind';
      
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          resolve(file);
        } else {
          reject(new Error('未选择文件'));
        }
      };
      
      input.oncancel = () => {
        reject(new Error('用户取消选择'));
      };
      
      input.click();
    });
  }

  validateFile(file) {
    if (!file) {
      return { valid: false, error: '未选择文件' };
    }

    if (!file.name.endsWith('.xmind')) {
      return { valid: false, error: '文件格式错误，请确认是否能在XMind软件中打开。' };
    }

    if (file.size > this.MAX_FILE_SIZE) {
      return { valid: false, error: '只支持50M以内文件，请先在XMind软件拆分。' };
    }

    return { valid: true, error: null };
  }

  readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      
      reader.onerror = () => {
        reject(new Error('文件读取失败'));
      };
      
      reader.readAsArrayBuffer(file);
    });
  }
}
