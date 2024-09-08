import { writeFileSync } from "fs";
import { getGitHubContributions } from "../lib/common.js";

const data = await getGitHubContributions("Kaciras");
writeFileSync("commits.json", JSON.stringify(data));
