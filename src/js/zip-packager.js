class ZipPackager {
  async package(baseFilename, markdownFiles, resources) {
    const zip = new JSZip();
    
    markdownFiles.forEach(file => {
      zip.file(file.filename, file.content);
    });
    
    if (resources.length > 0) {
      const assetsFolder = zip.folder('assets');
      resources.forEach(resource => {
        assetsFolder.file(resource.filename, resource.data);
      });
    }
    
    const zipBlob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    });
    
    return zipBlob;
  }

  download(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
