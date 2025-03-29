// import-fix.js
const fs = require('fs');
const path = require('path');

const targetExtensions = ['.js'];
const rootDir = path.join(__dirname, 'src');

const walkAndFix = (dir) => {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walkAndFix(fullPath);
    } else if (targetExtensions.includes(path.extname(file))) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      let original = content;

      // 旧相対パスから新構成への自動変換
      content = content
        .replace(/'\.\.\/firebase'/g, "'../../firebase'")
        .replace(/'\.\.\/components\/video\//g, "'../../components/video/")
        .replace(/'\.\.\/components\/common\//g, "'../../components/common/")
        .replace(/'\.\.\/components\//g, "'../../components/gacha/")
        .replace(/'\.\.\/utils\//g, "'../../utils/")
        .replace(/'\.\.\/assets\//g, "'../../assets/");

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`✔ 修正: ${fullPath}`);
      }
    }
  });
};

walkAndFix(rootDir);

