class MarkdownGenerator {
  constructor() {
    this.resourceMap = null;
  }

  generate(sheet, resourceMap) {
    this.resourceMap = resourceMap;
    
    let markdown = '';
    
    if (sheet.rootTopic) {
      markdown += this.convertTopic(sheet.rootTopic, 1);
    }
    
    return markdown;
  }

  convertTopic(topic, level) {
    let markdown = '';
    
    if (!topic.title) {
      const nullTopic = { title: 'NULL', ...topic };
      markdown += this.generateTitle(nullTopic, level);
      markdown += this.generateLink(nullTopic);
      markdown += this.generateLabels(nullTopic);
      markdown += this.generateImage(nullTopic);
      markdown += this.generateNotes(nullTopic);
      
      if (topic.children && topic.children.attached) {
        topic.children.attached.forEach(child => {
          markdown += this.convertTopic(child, level);
        });
      }
      
      return markdown;
    }
    
    markdown += this.generateTitle(topic, level);
    markdown += this.generateLink(topic);
    markdown += this.generateLabels(topic);
    markdown += this.generateImage(topic);
    markdown += this.generateNotes(topic);
    
    if (topic.children && topic.children.attached) {
      topic.children.attached.forEach(child => {
        markdown += this.convertTopic(child, level + 1);
      });
    }
    
    return markdown;
  }

  generateTitle(topic, level) {
    if (level <= 6) {
      if (topic.href) {
        return '#'.repeat(level) + ' [' + topic.title + '](' + topic.href + ')\n';
      } else {
        return '#'.repeat(level) + ' ' + topic.title + '\n';
      }
    } else {
      const indent = '    '.repeat(level - 7);
      if (topic.href) {
        return indent + '- [' + topic.title + '](' + topic.href + ')\n';
      } else {
        return indent + '- ' + topic.title + '\n';
      }
    }
  }

  generateLink(topic) {
    return '';
  }

  generateLabels(topic) {
    if (topic.labels && topic.labels.length > 0) {
      const escapedLabels = topic.labels.map(label => 
        Utils.escapeMarkdown(label)
      );
      return 'Lable:`' + escapedLabels.join(', ') + '`\n';
    }
    return '';
  }

  generateImage(topic) {
    if (topic.image) {
      const imagePath = topic.image.src.replace(/^xap:/, '');
      const filename = this.resourceMap.get(imagePath) || imagePath.split('/').pop();
      const altText = topic.title || 'NULL';
      return '![' + altText + '](assets/' + filename + ')\n';
    }
    return '';
  }

  generateNotes(topic) {
    if (topic.notes && topic.notes.plain) {
      return '```Notes\n' + topic.notes.plain.content + '```\n';
    }
    return '';
  }
}
