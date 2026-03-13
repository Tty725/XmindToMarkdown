# XMind to Markdown Converter

[简体中文](./README.md) | English

A browser-based local conversion tool that converts XMind files (`.xmind`) into Markdown files (`.md`).
Built based on the feature set supported by XMind 23.08 Free. Outline, boundary, legend and floating topics are ignored.
File size is limited to 50MB. All data is processed locally to protect your privacy.

## ✨ Features

- Supports both single-sheet and multi-sheet XMind files
- Automatically extracts and manages image assets
- Smart topic-level mapping (H1–H6 + nested lists; indentation from level 8)
- Supports links, labels, notes and other elements
- Purely local processing to protect data privacy
- Automatic ZIP packaging for convenient sharing
- Responsive design with mobile support

## 🚀 Quick Start

### How to Use

1. Open the `index.html` file directly in your browser
2. Click the "Choose XMind File" button and select a `.xmind` file
3. Click the "Start Conversion" button
4. Wait for the conversion to complete; the tool will automatically download a ZIP file
5. Unzip the ZIP file to get the Markdown file(s) and asset files

### System Requirements

- OS: Windows, Linux
- Browser: Chrome (latest version recommended)
- File size limit: within 50MB

## 📁 Project Structure

```
XmindToMarkdown/
├── index.html              # Main page
├── css/
│   └── style.css           # Styles
├── js/
│   ├── app.js              # App entry
│   ├── ui-controller.js    # UI controller
│   ├── file-handler.js     # File handling module
│   ├── xmind-parser.js     # XMind parsing module
│   ├── markdown-generator.js  # Markdown generation module
│   ├── resource-manager.js    # Resource management module
│   ├── conversion-manager.js  # Conversion management module
│   ├── zip-packager.js     # ZIP packaging module
│   └── utils.js            # Utility functions
├── 用户使用手册.md           # User guide
├── 技术文档.md              # Technical documentation
```

## 🛠️ Tech Stack

- **Core language:** JavaScript (ES6+)
- **UI:** Native HTML/CSS
- **File processing:** JSZip 3.10.1
- **Project size:** ~1.5MB (including dependencies)

## 📊 Supported XMind Elements

| Element Type | Support | Description |
|-------------|---------|-------------|
| Topic levels | ✅ Supported | Levels 1–6 mapped to H1–H6, level 8+ mapped to nested lists |
| Links | ✅ Supported | Converted to Markdown link format and integrated into headings |
| Labels | ✅ Supported | Converted to `Lable:` format; special characters are auto-escaped |
| Images | ✅ Supported | Saved to `assets/` and referenced automatically |
| Notes | ✅ Supported | Converted to code block format using `Notes` syntax |
| Empty topics | ✅ Supported | Empty topics displayed as `"NULL"` while keeping all elements |
| File attachments | ❌ Not supported | Only image attachments are supported; other attachments are ignored |
| Rich text styles | ❌ Not supported | Only plain text is preserved; style information is discarded |

## 📝 Markdown Output Format

### File Naming Rules

- Single-sheet file: generate a `.md` file with the same name as the XMind file
- Multi-sheet file: generate multiple `.md` files, named as `"filename_index.md"`

### Topic Level Mapping

```
# Level 1 Topic (H1)
## Level 2 Topic (H2)
### Level 3 Topic (H3)
#### Level 4 Topic (H4)
##### Level 5 Topic (H5)
###### Level 6 Topic (H6)
- Level 7 Topic (list)
    - Level 8 Topic (nested list)
```

### Content Order

The content of each topic follows this order:

1. Text content (including links)
2. Labels (on a separate line)
3. Images
4. Notes (code block)

**Example:**

```markdown
# Central Topic
## [Branch Topic](https://example.com)
Lable:`tag1, tag2`
![Image Description](assets/image.png)
```Notes
Note content
```
```

## 📖 Documentation

- [User Guide](用户使用手册.md) - Detailed usage instructions and FAQs
- [Technical Documentation](技术文档.md) - Architecture design, API reference and development guide

## 🔒 Privacy Statement

This tool is built based on the features supported by XMind 23.08 Free. All data files are processed locally to protect your privacy.

- All file processing is done locally in the browser
- No data is uploaded to any server
- No user information is collected
- The tool can be used offline after conversion

## 📈 Performance Reference

| File Size | Topic Count | Image Count | Conversion Time |
|----------|-------------|-------------|-----------------|
| < 1MB | < 50 | < 10 | < 5s |
| 1–5MB | 50–200 | 10–30 | 5–15s |
| 5–10MB | 200–500 | 30–50 | 15–30s |
| 10–50MB | 500–1000 | 50–100 | 30–60s |

## ⚠️ Known Limitations

- Only image attachments are supported; other attachment types are not supported
- Rich text styles (bold, italic, color, etc.) are not supported
- Advanced XMind features (formulas, charts, etc.) are not supported
- File size is limited to 50MB
- Outline, boundary and floating topics are ignored

## 🤝 Contributing

Issues and pull requests are welcome!

## 📄 License

MIT License

## 📞 Contact

If you have any questions or suggestions, please contact us through:

- Submitting an Issue to the project repository
- Sending an email to the technical support address

---

**Version:** v1.1.3  
**Last Updated:** 2026-01-14

