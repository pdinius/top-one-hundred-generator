const fs = require('fs');

const camelCase = str => {
    return str.replace(/-(\w)/g, (_,l) => l.toUpperCase());
}

let iconList = fs.readdirSync('./').filter(v => v.endsWith('svg'));
let res = 'import { MouseEventHandler } from "react";\n\n'
let iconNames = []

for (let i of iconList) {
    let name = camelCase(i.replace(/\.svg/, ''));
    iconNames.push(name);
    let icon = fs.readFileSync('./' + i, 'utf8').replace(/<!--.*?-->/g, '').replace(/<svg/, '<svg className={className} onClick={onClick}').replace(/></g, '>\n<');
    res += `const ${name} = (className: string, onClick?: MouseEventHandler) => (${icon});\n\n`;
}

res += `export const IconSvgs = {
    ${iconNames.join(', ')}
}\n\n`

res += `export type IconNames = keyof typeof IconSvgs;\n`

fs.writeFileSync('./icon-data.tsx', res);