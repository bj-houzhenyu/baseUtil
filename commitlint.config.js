module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
      "type-enum": [2, "always", [
          "init", "feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert", "tag", "dep"
      ]],
      "subject-full-stop": [0, "never"],
      "subject-case": [0, "never"]
  }
}
