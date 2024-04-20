import fs from "fs";
import path from "path";
import {exec} from "child_process";

const iconsFolder = `./src/Icons`;

const icons = fs
  .readdirSync(path.resolve("./", iconsFolder))
  .filter((file) => file.includes(".svg"));

fs.writeFileSync("./src/Icons/index.tsx", "");

const formatSvg = (svgContent) => {
  const modifiedSvgContent = svgContent
    .replace(/fill="[^"]*"/g, "fill={color}")
    .replace(/stroke="[^"]*"/g, "")
    .replace(/width="[^"]*"/g, "width={size}")
    .replace(/height="[^"]*"/g, "height={size}");
  return modifiedSvgContent;
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
    const ${kebabToPascal(file.replace(".svg", ""))}Icon:React.FC<{size?: number; color?: string}> = ({size = 24, color}) => (${modifiedSvgContent})
  `;
});

fs.writeFileSync(
  "./src/Icons/index.tsx",
  `import React from "react" \n ${formattedSvgs.join("\n")} \n export { ${svgNames.join(",\n")} }`,
);

exec("prettier --write ./src/Icons/index.tsx");
