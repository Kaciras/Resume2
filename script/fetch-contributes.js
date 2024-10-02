import { writeFileSync } from "fs";
import { join } from "path";
import { getGitHubContributions } from "../lib/common.js";

const commits = await getGitHubContributions("Kaciras");
const json = JSON.stringify(commits);
writeFileSync(join(import.meta.dirname, "../lib/commits.json"), json);
