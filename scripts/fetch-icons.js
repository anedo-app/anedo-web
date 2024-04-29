import fs from "fs";
import path from "path";
import {exec} from "child_process";

const iconsFolder = `./src/Icons`;

const icons = fs
  .readdirSync(path.resolve("./", iconsFolder))
  .filter((file) => file.includes(".svg"));

fs.writeFileSync("./src/Icons/index.tsx", "");

const formatSvg = (svgContent) => {
  const fillAttributeRegex = /fill="[^"]*"/g,
    strokeAttributeRegex = /stroke="[^"]*"/g,
    widthAttributeRegex = /width="[^"]*"/g,
    heightAttributeRegex = /height="[^"]*"/g;

  return svgContent
    .replace(fillAttributeRegex, "fill={color}")
    .replace(strokeAttributeRegex, "")
    .replace(widthAttributeRegex, "width={size}")
    .replace(heightAttributeRegex, "height={size}");
};

const kebabToPascal = (svgName) => {
  return svgName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

const svgNames = icons.map((file) =>
  kebabToPascal(file.replace(".svg", "Icon")),
);

const formattedSvgs = icons.map((file) => {
  const svgContent = fs.readFileSync(path.join(iconsFolder, file), "utf-8");
  const modifiedSvgContent = formatSvg(svgContent);
  return `
    const ${kebabToPascal(file.replace(".svg", ""))}Icon:React.FC<IIconProps> = ({size = 24, color}) => (${modifiedSvgContent})
  `;
});

fs.writeFileSync(
  "./src/Icons/index.tsx",
  `import {IIconProps} from "./icons.type"; import React from "react" \n ${formattedSvgs.join("\n")} \n export { ${svgNames.join(",\n")} }`,
);

exec("prettier --write ./src/Icons/index.tsx");
